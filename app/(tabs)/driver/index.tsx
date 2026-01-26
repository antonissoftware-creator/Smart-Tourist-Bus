import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { useRouter } from "expo-router";

import { useThemeColor } from "@/hooks/use-theme-color";
import type {
  ClimateMode,
  LanePosition,
  SpeedStatus,
} from "@/types/driver-dashboard";

const WARNING_SOUND = require("../../../assets/sounds/warning-alarm.mp3");

const withAlpha = (color: string, alpha: number) => {
  if (color.startsWith("#") && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const getSpeedStatus = (speed: number): SpeedStatus => {
  if (speed > 80) return "danger";
  if (speed > 75) return "warning";
  return "safe";
};

export default function DriverIndex() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "background");
  const surfaceColor = useThemeColor({}, "surface");
  const surfaceMutedColor = useThemeColor({}, "surfaceMuted");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const iconColor = useThemeColor({}, "icon");
  const successColor = useThemeColor({}, "success");
  const warningColor = useThemeColor({}, "warning");
  const dangerColor = useThemeColor({}, "danger");
  const infoColor = useThemeColor({}, "info");
  const accentColor = useThemeColor({}, "accent");

  const cardBorder = withAlpha(borderColor, 0.7);
  const successSoft = withAlpha(successColor, 0.12);
  const warningSoft = withAlpha(warningColor, 0.12);

  const [speed, setSpeed] = useState(65);
  const [lanePosition, setLanePosition] = useState<LanePosition>("center");
  const [fatigueLevel, setFatigueLevel] = useState(22);
  const [passengersExiting, setPassengersExiting] = useState(false);

  const [isAuto, setIsAuto] = useState(true);
  const [climateMode, setClimateMode] = useState<ClimateMode>("cooling");
  const [targetTemp, setTargetTemp] = useState(22);
  const [currentTemp] = useState(24);
  const [outsideTemp] = useState(28);
  const [energyConsumption, setEnergyConsumption] = useState(45);

  const [robotActive, setRobotActive] = useState(false);
  const [robotProgress, setRobotProgress] = useState(65);
  const [foundItem, setFoundItem] = useState<string | null>("Διαβατήριο");
  const [warningReady, setWarningReady] = useState(false);
  const warningSoundRef = useRef<Audio.Sound | null>(null);
  const warningPlayingRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const change = Math.random() * 10 - 5;
        return clamp(prev + change, 0, 120);
      });

      const positions: LanePosition[] = ["center", "center", "left", "right"];
      setLanePosition(positions[Math.floor(Math.random() * positions.length)]);

      setFatigueLevel((prev) => clamp(prev + Math.random() * 2, 0, 100));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadWarningSound = async () => {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound } = await Audio.Sound.createAsync(WARNING_SOUND, {
          shouldPlay: false,
          isLooping: true,
          volume: 1.0,
        });
        if (!isMounted) {
          await sound.unloadAsync();
          return;
        }
        warningSoundRef.current = sound;
        setWarningReady(true);
      } catch {
        setWarningReady(false);
      }
    };

    loadWarningSound();

    return () => {
      isMounted = false;
      if (warningSoundRef.current) {
        warningSoundRef.current.unloadAsync();
        warningSoundRef.current = null;
        warningPlayingRef.current = false;
      }
    };
  }, []);

  useEffect(() => {
    const tempDiff = Math.abs(targetTemp - currentTemp);
    setEnergyConsumption(clamp(30 + tempDiff * 5, 0, 100));
  }, [targetTemp, currentTemp]);

  useEffect(() => {
    if (!robotActive) return undefined;
    const interval = setInterval(() => {
      setRobotProgress((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 2200);
    return () => clearInterval(interval);
  }, [robotActive]);

  const speedStatus = getSpeedStatus(speed);
  const speedAccent =
    speedStatus === "danger"
      ? dangerColor
      : speedStatus === "warning"
        ? warningColor
        : successColor;

  const laneOffCenter = lanePosition !== "center";
  const laneAccent = laneOffCenter ? warningColor : successColor;
  const shouldWarn = speedStatus === "danger" || laneOffCenter;

  const energyAccent =
    energyConsumption > 70
      ? dangerColor
      : energyConsumption > 50
        ? warningColor
        : successColor;

  const adjustTargetTemp = (delta: number) => {
    setTargetTemp((prev) => clamp(prev + delta, 16, 30));
  };

  useEffect(() => {
    const sound = warningSoundRef.current;
    if (!warningReady || !sound) return;

    if (shouldWarn && !warningPlayingRef.current) {
      warningPlayingRef.current = true;
      void sound.setPositionAsync(0).then(() => sound.playAsync());
      return;
    }

    if (!shouldWarn && warningPlayingRef.current) {
      warningPlayingRef.current = false;
      void sound.stopAsync();
    }
  }, [shouldWarn, warningReady]);

  const tempProgress = ((targetTemp - 16) / 14) * 100;

  const quickActions = useMemo(
    () => [
      {
        id: "passengers",
        label: passengersExiting ? "Επιβάτες Κατεβαίνουν" : "Επιβάτες OK",
        icon: "account-group",
        active: passengersExiting,
        onPress: () => setPassengersExiting((prev) => !prev),
      },
      {
        id: "break",
        label: "Διάλειμμα",
        icon: "coffee",
        active: false,
        onPress: () => setFatigueLevel(0),
      },
      {
        id: "sos",
        label: "SOS Κλήση",
        icon: "alert-circle-outline",
        active: false,
        onPress: () => {},
      },
      {
        id: "vent",
        label: "Αερισμός",
        icon: "fan",
        active: false,
        onPress: () => {},
      },
    ],
    [passengersExiting],
  );

  const { width } = useWindowDimensions();
  const isWide = width >= 960;
  const actionWidth = isWide ? "23%" : "48%";

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.headerCard,
          { backgroundColor: surfaceColor, borderColor: cardBorder },
        ]}
      >
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: tintColor }]}>
            <MaterialCommunityIcons
              name="bus"
              size={26}
              color={backgroundColor}
            />
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: textColor }]}>
              Σύστημα Ελέγχου Οδηγού
            </Text>
            <Text style={[styles.headerSubtitle, { color: mutedTextColor }]}>
              Πίνακας Λεωφορείου #2847
            </Text>
          </View>
        </View>
      </View>

      {passengersExiting ? (
        <View
          style={[
            styles.alertCard,
            { backgroundColor: warningSoft, borderColor: warningColor },
          ]}
        >
          <View style={[styles.alertIcon, { backgroundColor: warningColor }]}>
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={backgroundColor}
            />
          </View>
          <View style={styles.alertBody}>
            <Text style={[styles.alertTitle, { color: warningColor }]}>
              Προσοχή: Επιβάτες κατεβαίνουν
            </Text>
            <Text style={[styles.alertSubtitle, { color: mutedTextColor }]}>
              Περιμένετε πριν κλείσετε τις πόρτες.
            </Text>
          </View>
          <View style={[styles.alertBadge, { backgroundColor: warningColor }]}>
            <Text style={[styles.alertBadgeValue, { color: backgroundColor }]}>
              3
            </Text>
            <Text style={[styles.alertBadgeLabel, { color: backgroundColor }]}>
              Επιβάτες
            </Text>
          </View>
        </View>
      ) : null}

      {fatigueLevel >= 70 ? (
        <View
          style={[
            styles.alertCard,
            { backgroundColor: warningSoft, borderColor: warningColor },
          ]}
        >
          <View style={[styles.alertIcon, { backgroundColor: warningColor }]}>
            <MaterialCommunityIcons
              name="coffee"
              size={24}
              color={backgroundColor}
            />
          </View>
          <View style={styles.alertBody}>
            <Text style={[styles.alertTitle, { color: warningColor }]}>
              Σκεφτείτε ένα διάλειμμα
            </Text>
            <Text style={[styles.alertSubtitle, { color: mutedTextColor }]}>
              Το σύστημα εντοπίζει σημάδια κόπωσης.
            </Text>
            <View style={styles.alertProgress}>
              <View style={styles.alertRow}>
                <Text style={[styles.alertLabel, { color: mutedTextColor }]}>
                  Επίπεδο κόπωσης
                </Text>
                <Text style={[styles.alertLabel, { color: warningColor }]}>
                  {Math.round(fatigueLevel)}%
                </Text>
              </View>
              <View
                style={[
                  styles.progressTrack,
                  { backgroundColor: surfaceMutedColor },
                ]}
              >
                <View
                  style={{
                    width: `${fatigueLevel}%`,
                    height: "100%",
                    backgroundColor: warningColor,
                    borderRadius: 999,
                  }}
                />
              </View>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => setFatigueLevel(0)}
            style={({ pressed }) => [
              styles.iconButton,
              { backgroundColor: surfaceColor, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <MaterialCommunityIcons name="check" size={18} color={textColor} />
          </Pressable>
        </View>
      ) : null}

      <View style={[styles.row, isWide && styles.rowWide]}>
        <View
          style={[
            styles.card,
            {
              backgroundColor:
                speedStatus === "safe"
                  ? surfaceColor
                  : withAlpha(speedAccent, 0.12),
              borderColor: speedStatus === "safe" ? cardBorder : speedAccent,
            },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View style={[styles.cardIcon, { backgroundColor: speedAccent }]}>
              <MaterialCommunityIcons
                name="speedometer"
                size={20}
                color={backgroundColor}
              />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: textColor }]}>
                Παρακολούθηση Ταχύτητας
              </Text>
              <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>
                Όριο 80 km/h
              </Text>
            </View>
            {speedStatus !== "safe" ? (
              <View
                style={[styles.statusPill, { backgroundColor: speedAccent }]}
              >
                <Text
                  style={[styles.statusPillText, { color: backgroundColor }]}
                >
                  {speedStatus === "danger" ? "ΥΠΕΡΒΑΣΗ" : "ΠΡΟΣΟΧΗ"}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.speedRow}>
            <Text style={[styles.speedValue, { color: speedAccent }]}>
              {Math.round(speed)}
            </Text>
            <Text style={[styles.speedUnit, { color: mutedTextColor }]}>
              km/h
            </Text>
          </View>
          <View
            style={[
              styles.progressTrack,
              { backgroundColor: surfaceMutedColor },
            ]}
          >
            <View
              style={{
                width: `${Math.min((speed / 120) * 100, 100)}%`,
                height: "100%",
                backgroundColor: speedAccent,
                borderRadius: 999,
              }}
            />
          </View>
          {speedStatus !== "safe" ? (
            <View
              style={[
                styles.noticeCard,
                { backgroundColor: warningSoft, borderColor: warningColor },
              ]}
            >
              <Text style={[styles.noticeText, { color: warningColor }]}>
                {speedStatus === "danger"
                  ? "Παρακαλώ μειώστε την ταχύτητα άμεσα."
                  : "Πλησιάζετε το όριο ταχύτητας."}
              </Text>
            </View>
          ) : null}
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: laneOffCenter ? warningSoft : surfaceColor,
              borderColor: laneOffCenter ? warningColor : cardBorder,
            },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View style={[styles.cardIcon, { backgroundColor: laneAccent }]}>
              <MaterialCommunityIcons
                name="road-variant"
                size={20}
                color={backgroundColor}
              />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: textColor }]}>
                Ανίχνευση Λωρίδας
              </Text>
              <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>
                Θέση στο οδόστρωμα
              </Text>
            </View>
            {laneOffCenter ? (
              <View
                style={[styles.statusPill, { backgroundColor: warningColor }]}
              >
                <Text
                  style={[styles.statusPillText, { color: backgroundColor }]}
                >
                  ΠΑΡΕΚΚΛΙΣΗ
                </Text>
              </View>
            ) : null}
          </View>

          <View
            style={[styles.laneVisual, { backgroundColor: surfaceMutedColor }]}
          >
            {(["left", "center", "right"] as LanePosition[]).map((lane) => (
              <View key={lane} style={styles.laneColumn}>
                <View
                  style={[styles.laneMarker, { backgroundColor: iconColor }]}
                />
                {lane === lanePosition ? (
                  <View
                    style={[styles.laneBus, { backgroundColor: laneAccent }]}
                  >
                    <MaterialCommunityIcons
                      name="bus"
                      size={16}
                      color={backgroundColor}
                    />
                  </View>
                ) : null}
              </View>
            ))}
          </View>

          <View style={styles.laneStatusRow}>
            <Text style={[styles.laneLabel, { color: mutedTextColor }]}>
              Τρέχουσα θέση
            </Text>
            <Text style={[styles.laneValue, { color: laneAccent }]}>
              {lanePosition === "center"
                ? "✓ Κέντρο Λωρίδας"
                : lanePosition === "left"
                  ? "← Αριστερά"
                  : "Δεξιά →"}
            </Text>
          </View>
          {laneOffCenter ? (
            <View
              style={[
                styles.noticeCard,
                { backgroundColor: warningSoft, borderColor: warningColor },
              ]}
            >
              <Text style={[styles.noticeText, { color: warningColor }]}>
                Επανέλθετε στο κέντρο της λωρίδας.
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={[styles.row, isWide && styles.rowWide]}>
        <View
          style={[
            styles.card,
            { backgroundColor: surfaceColor, borderColor: cardBorder },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View
              style={[
                styles.cardIcon,
                {
                  backgroundColor:
                    climateMode === "cooling" ? infoColor : warningColor,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={climateMode === "cooling" ? "snowflake" : "fire"}
                size={20}
                color={backgroundColor}
              />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: textColor }]}>
                Κλιματισμός
              </Text>
              <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>
                {climateMode === "cooling"
                  ? "Λειτουργία ψύξης"
                  : "Λειτουργία θέρμανσης"}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsAuto((prev) => !prev)}
              style={({ pressed }) => [
                styles.modeToggle,
                {
                  backgroundColor: isAuto ? tintColor : surfaceMutedColor,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.modeToggleText,
                  { color: isAuto ? backgroundColor : textColor },
                ]}
              >
                {isAuto ? "AUTO" : "MANUAL"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.tempGrid}>
            <View
              style={[styles.tempCard, { backgroundColor: surfaceMutedColor }]}
            >
              <Text style={[styles.tempLabel, { color: mutedTextColor }]}>
                Εσωτερική
              </Text>
              <Text style={[styles.tempValue, { color: textColor }]}>
                {currentTemp}°C
              </Text>
            </View>
            <View
              style={[styles.tempCard, { backgroundColor: surfaceMutedColor }]}
            >
              <Text style={[styles.tempLabel, { color: mutedTextColor }]}>
                Εξωτερική
              </Text>
              <Text style={[styles.tempValue, { color: textColor }]}>
                {outsideTemp}°C
              </Text>
            </View>
          </View>

          <View style={styles.modeRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setClimateMode("cooling")}
              disabled={isAuto}
              style={({ pressed }) => [
                styles.modeButton,
                {
                  backgroundColor:
                    climateMode === "cooling" ? infoColor : surfaceMutedColor,
                  opacity: pressed ? 0.85 : isAuto ? 0.6 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="snowflake"
                size={18}
                color={climateMode === "cooling" ? backgroundColor : textColor}
              />
              <Text
                style={[
                  styles.modeButtonText,
                  {
                    color:
                      climateMode === "cooling" ? backgroundColor : textColor,
                  },
                ]}
              >
                Ψύξη
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => setClimateMode("heating")}
              disabled={isAuto}
              style={({ pressed }) => [
                styles.modeButton,
                {
                  backgroundColor:
                    climateMode === "heating"
                      ? warningColor
                      : surfaceMutedColor,
                  opacity: pressed ? 0.85 : isAuto ? 0.6 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="fire"
                size={18}
                color={climateMode === "heating" ? backgroundColor : textColor}
              />
              <Text
                style={[
                  styles.modeButtonText,
                  {
                    color:
                      climateMode === "heating" ? backgroundColor : textColor,
                  },
                ]}
              >
                Θέρμανση
              </Text>
            </Pressable>
          </View>

          <View style={styles.targetRow}>
            <View>
              <Text style={[styles.tempLabel, { color: mutedTextColor }]}>
                Στόχος θερμοκρασίας
              </Text>
              <Text
                style={[
                  styles.targetValue,
                  {
                    color: climateMode === "cooling" ? infoColor : warningColor,
                  },
                ]}
              >
                {targetTemp}°C
              </Text>
            </View>
            <View style={styles.stepperRow}>
              <Pressable
                accessibilityRole="button"
                onPress={() => adjustTargetTemp(-1)}
                disabled={isAuto}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    backgroundColor: surfaceMutedColor,
                    opacity: pressed ? 0.8 : isAuto ? 0.6 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={16}
                  color={textColor}
                />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => adjustTargetTemp(1)}
                disabled={isAuto}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    backgroundColor: surfaceMutedColor,
                    opacity: pressed ? 0.8 : isAuto ? 0.6 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={16}
                  color={textColor}
                />
              </Pressable>
            </View>
          </View>

          <View
            style={[
              styles.progressTrack,
              { backgroundColor: surfaceMutedColor },
            ]}
          >
            <View
              style={{
                width: `${tempProgress}%`,
                height: "100%",
                backgroundColor:
                  climateMode === "cooling" ? infoColor : warningColor,
                borderRadius: 999,
              }}
            />
          </View>

          <View
            style={[
              styles.noticeCard,
              {
                backgroundColor: withAlpha(energyAccent, 0.12),
                borderColor: energyAccent,
              },
            ]}
          >
            <View style={styles.energyRow}>
              <MaterialCommunityIcons
                name="flash"
                size={16}
                color={energyAccent}
              />
              <Text style={[styles.energyLabel, { color: energyAccent }]}>
                Κατανάλωση Ενέργειας
              </Text>
              <Text style={[styles.energyValue, { color: energyAccent }]}>
                {energyConsumption}%
              </Text>
            </View>
            <View
              style={[
                styles.progressTrack,
                { backgroundColor: surfaceMutedColor },
              ]}
            >
              <View
                style={{
                  width: `${energyConsumption}%`,
                  height: "100%",
                  backgroundColor: energyAccent,
                  borderRadius: 999,
                }}
              />
            </View>
            {isAuto ? (
              <Text style={[styles.energyHint, { color: mutedTextColor }]}>
                Το AUTO προσαρμόζεται στις συνθήκες της διαδρομής.
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: surfaceColor, borderColor: cardBorder },
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View style={[styles.cardIcon, { backgroundColor: accentColor }]}>
              <MaterialCommunityIcons
                name="robot"
                size={20}
                color={backgroundColor}
              />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: textColor }]}>
                Ρομπότ Καθαρισμού
              </Text>
              <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>
                {robotActive ? "Σε λειτουργία" : "Αναμονή"}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setRobotActive((prev) => !prev)}
              style={({ pressed }) => [
                styles.iconButton,
                {
                  backgroundColor: robotActive ? warningColor : successColor,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={robotActive ? "pause" : "play"}
                size={18}
                color={backgroundColor}
              />
            </Pressable>
          </View>

          {robotActive ? (
            <View style={styles.robotProgress}>
              <View style={styles.robotRow}>
                <Text style={[styles.robotLabel, { color: mutedTextColor }]}>
                  Πρόοδος Καθαρισμού
                </Text>
                <Text style={[styles.robotLabel, { color: accentColor }]}>
                  {robotProgress}%
                </Text>
              </View>
              <View
                style={[
                  styles.progressTrack,
                  { backgroundColor: surfaceMutedColor },
                ]}
              >
                <View
                  style={{
                    width: `${robotProgress}%`,
                    height: "100%",
                    backgroundColor: accentColor,
                    borderRadius: 999,
                  }}
                />
              </View>
            </View>
          ) : null}

          <View
            style={[styles.robotGrid, { backgroundColor: surfaceMutedColor }]}
          >
            {Array.from({ length: 16 }).map((_, index) => {
              const filled = index < Math.round((robotProgress / 100) * 16);
              return (
                <View
                  key={`seat-${index}`}
                  style={{
                    width: "22%",
                    aspectRatio: 1,
                    borderRadius: 6,
                    backgroundColor: filled ? successSoft : surfaceColor,
                    borderWidth: 1,
                    borderColor: filled ? successColor : cardBorder,
                  }}
                />
              );
            })}
          </View>

          {foundItem ? (
            <View
              style={[
                styles.noticeCard,
                { backgroundColor: warningSoft, borderColor: warningColor },
              ]}
            >
              <Text style={[styles.noticeText, { color: warningColor }]}>
                Εντοπίστηκε αντικείμενο: {foundItem}
              </Text>
              <View style={styles.noticeActions}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {}}
                  style={({ pressed }) => [
                    styles.noticeButton,
                    {
                      backgroundColor: warningColor,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.noticeButtonText,
                      { color: backgroundColor },
                    ]}
                  >
                    Ειδοποίηση
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setFoundItem(null)}
                  style={({ pressed }) => [
                    styles.noticeButton,
                    {
                      backgroundColor: surfaceMutedColor,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.noticeButtonText, { color: textColor }]}>
                    Αποθήκευση
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          <View style={styles.robotStatusRow}>
            <View
              style={[
                styles.robotStatusCard,
                { backgroundColor: surfaceMutedColor },
              ]}
            >
              <Text style={[styles.robotMeta, { color: mutedTextColor }]}>
                Μπαταρία
              </Text>
              <Text style={[styles.robotValue, { color: textColor }]}>87%</Text>
            </View>
            <View
              style={[
                styles.robotStatusCard,
                { backgroundColor: surfaceMutedColor },
              ]}
            >
              <Text style={[styles.robotMeta, { color: mutedTextColor }]}>
                Αντικείμενα
              </Text>
              <Text style={[styles.robotValue, { color: textColor }]}>
                {foundItem ? "1" : "0"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: surfaceColor, borderColor: cardBorder },
        ]}
      >
        <Text style={[styles.cardTitle, { color: textColor }]}>
          Γρήγορες Ενέργειες
        </Text>
        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              accessibilityRole="button"
              onPress={action.onPress}
              style={({ pressed }) => [
                styles.quickCard,
                {
                  width: actionWidth,
                  backgroundColor: action.active
                    ? warningColor
                    : surfaceMutedColor,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={action.icon as any}
                size={22}
                color={action.active ? backgroundColor : textColor}
              />
              <Text
                style={[
                  styles.quickLabel,
                  { color: action.active ? backgroundColor : textColor },
                ]}
              >
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
    gap: 20,
  },
  headerCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  headerButtonText: {
    fontSize: 12,
    fontWeight: "700",
  },
  alertCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  alertIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  alertBody: {
    flex: 1,
    gap: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  alertSubtitle: {
    fontSize: 12,
  },
  alertBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
  },
  alertBadgeValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  alertBadgeLabel: {
    fontSize: 10,
    fontWeight: "700",
  },
  alertProgress: {
    gap: 8,
    marginTop: 8,
  },
  alertRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  alertLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    gap: 16,
  },
  rowWide: {
    flexDirection: "row",
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 14,
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "700",
  },
  speedRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  speedValue: {
    fontSize: 42,
    fontWeight: "700",
  },
  speedUnit: {
    fontSize: 14,
    marginBottom: 6,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  noticeCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  noticeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  laneVisual: {
    flexDirection: "row",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  laneColumn: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  laneMarker: {
    width: 3,
    height: 60,
    borderRadius: 4,
  },
  laneBus: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  laneStatusRow: {
    gap: 4,
  },
  laneLabel: {
    fontSize: 12,
  },
  laneValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  modeToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  modeToggleText: {
    fontSize: 11,
    fontWeight: "700",
  },
  tempGrid: {
    flexDirection: "row",
    gap: 12,
  },
  tempCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
  },
  tempLabel: {
    fontSize: 12,
  },
  tempValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },
  modeRow: {
    flexDirection: "row",
    gap: 12,
  },
  modeButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  modeButtonText: {
    fontSize: 12,
    fontWeight: "700",
  },
  targetRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  targetValue: {
    fontSize: 24,
    fontWeight: "700",
  },
  stepperRow: {
    flexDirection: "row",
    gap: 8,
  },
  energyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  energyLabel: {
    fontSize: 12,
    fontWeight: "700",
    flex: 1,
  },
  energyValue: {
    fontSize: 12,
    fontWeight: "700",
  },
  energyHint: {
    fontSize: 11,
    marginTop: 8,
  },
  robotProgress: {
    gap: 8,
  },
  robotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  robotLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  robotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  noticeActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  noticeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  noticeButtonText: {
    fontSize: 12,
    fontWeight: "700",
  },
  robotStatusRow: {
    flexDirection: "row",
    gap: 12,
  },
  robotStatusCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  robotMeta: {
    fontSize: 11,
  },
  robotValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickCard: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    gap: 8,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
