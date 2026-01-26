import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import type { RoofStatus, WeatherStatus } from "@/types/staff-dashboard";

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

export default function StaffDashboard() {
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

  const cardBorder = withAlpha(borderColor, 0.7);
  const tintSoft = withAlpha(tintColor, 0.12);
  const successSoft = withAlpha(successColor, 0.12);
  const warningSoft = withAlpha(warningColor, 0.12);
  const dangerSoft = withAlpha(dangerColor, 0.12);
  const infoSoft = withAlpha(infoColor, 0.12);

  const [solarProduction, setSolarProduction] = useState(450);
  const [systemConsumption, setSystemConsumption] = useState(320);
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [weather, setWeather] = useState<WeatherStatus>("sunny");
  const [roofStatus, setRoofStatus] = useState<RoofStatus>("open");
  const [roofLocked, setRoofLocked] = useState(false);
  const [acEnabled, setAcEnabled] = useState(true);
  const [lightsLevel, setLightsLevel] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setSolarProduction((prev) => {
        const change = Math.random() * 50 - 25;
        return clamp(prev + change, 0, 800);
      });

      setSystemConsumption((prev) => {
        const change = Math.random() * 30 - 15;
        return clamp(prev + change, 100, 600);
      });

      setBatteryLevel((prev) => {
        const netEnergy = solarProduction - systemConsumption;
        const change = netEnergy > 0 ? 0.5 : -0.3;
        return clamp(prev + change, 0, 100);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [solarProduction, systemConsumption]);

  const netEnergy = solarProduction - systemConsumption;
  const isCharging = netEnergy > 0;
  const maxSolar = 800;
  const solarEfficiency = clamp((solarProduction / maxSolar) * 100, 0, 100);
  const solarPanels = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => {
        const offset = (index % 6) * 3 - 7;
        return clamp(solarEfficiency + offset, 15, 100);
      }),
    [solarEfficiency],
  );

  const isRoofOptimal =
    (weather === "sunny" && roofStatus === "open") ||
    (weather === "cloudy" && roofStatus === "closed");

  const toggleRoof = (nextStatus: RoofStatus) => {
    if (roofLocked) return;
    setRoofStatus(nextStatus);
  };

  const adjustLights = (delta: number) => {
    setLightsLevel((prev) => clamp(prev + delta, 0, 100));
  };

  const { width } = useWindowDimensions();
  const isWide = width >= 960;
  const isTablet = width >= 720;
  const statCardWidth = isWide ? "23%" : isTablet ? "48%" : "100%";

  const acConsumption = acEnabled ? 180 : 0;
  const lightsConsumption = Math.round((lightsLevel / 100) * 80);
  const systemsConsumption = 60;
  const totalSaved = acEnabled ? 0 : 180;

  const batteryCapacity = 5000;
  const storedEnergy = Math.round((batteryLevel / 100) * batteryCapacity);
  const timeRemainingMinutes = isCharging
    ? ((100 - batteryLevel) / 100) * 180
    : (batteryLevel / 100) * 240;

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.headerCard, { backgroundColor: surfaceColor, borderColor: cardBorder }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: infoColor }]}> 
            <MaterialCommunityIcons name="flash" size={26} color={backgroundColor} />
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: textColor }]}>Διαχείριση Ενέργειας</Text>
            <Text style={[styles.headerSubtitle, { color: mutedTextColor }]}>Πίνακας Υπαλλήλων · Λεωφορείο #2847</Text>
          </View>
        </View>
        <View style={styles.headerBadgeRow}>
          <View style={[styles.headerBadge, { backgroundColor: tintSoft, borderColor: tintColor }]}> 
            <Text style={[styles.headerBadgeText, { color: tintColor }]}>Ζωντανά δεδομένα</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { width: statCardWidth, backgroundColor: surfaceColor, borderColor: cardBorder }]}
        >
          <View style={styles.statHeader}>
            <View style={[styles.statIcon, { backgroundColor: warningColor }]}> 
              <MaterialCommunityIcons name="white-balance-sunny" size={20} color={backgroundColor} />
            </View>
            <Text style={[styles.statLabel, { color: mutedTextColor }]}>Παραγωγή</Text>
          </View>
          <Text style={[styles.statValue, { color: textColor }]}>{Math.round(solarProduction)}W</Text>
          <Text style={[styles.statMeta, { color: mutedTextColor }]}>Φωτοβολταϊκά ενεργά</Text>
        </View>

        <View style={[styles.statCard, { width: statCardWidth, backgroundColor: surfaceColor, borderColor: cardBorder }]}
        >
          <View style={styles.statHeader}>
            <View style={[styles.statIcon, { backgroundColor: infoColor }]}> 
              <MaterialCommunityIcons name="flash" size={20} color={backgroundColor} />
            </View>
            <Text style={[styles.statLabel, { color: mutedTextColor }]}>Κατανάλωση</Text>
          </View>
          <Text style={[styles.statValue, { color: textColor }]}>{Math.round(systemConsumption)}W</Text>
          <Text style={[styles.statMeta, { color: mutedTextColor }]}>AC · Φωτισμός · Συστήματα</Text>
        </View>

        <View style={[styles.statCard, { width: statCardWidth, backgroundColor: isCharging ? successSoft : warningSoft, borderColor: isCharging ? successColor : warningColor }]}
        >
          <View style={styles.statHeader}>
            <View style={[styles.statIcon, { backgroundColor: isCharging ? successColor : warningColor }]}> 
              <MaterialCommunityIcons name={isCharging ? "battery-charging" : "battery-alert"} size={20} color={backgroundColor} />
            </View>
            <Text style={[styles.statLabel, { color: isCharging ? successColor : warningColor }]}>{isCharging ? "Φόρτιση" : "Εκφόρτιση"}</Text>
          </View>
          <Text style={[styles.statValue, { color: isCharging ? successColor : warningColor }]}>{isCharging ? "+" : ""}{Math.round(netEnergy)}W</Text>
          <Text style={[styles.statMeta, { color: isCharging ? successColor : warningColor }]}>{isCharging ? "Αποθήκευση ενέργειας" : "Χρήση μπαταρίας"}</Text>
        </View>

        <View style={[styles.statCard, { width: statCardWidth, backgroundColor: surfaceColor, borderColor: cardBorder }]}
        >
          <View style={styles.statHeader}>
            <View style={[styles.statIcon, { backgroundColor: batteryLevel > 50 ? successColor : batteryLevel > 20 ? warningColor : dangerColor }]}> 
              <MaterialCommunityIcons name="battery" size={20} color={backgroundColor} />
            </View>
            <Text style={[styles.statLabel, { color: mutedTextColor }]}>Μπαταρία</Text>
          </View>
          <Text style={[styles.statValue, { color: textColor }]}>{Math.round(batteryLevel)}%</Text>
          <View style={[styles.progressTrack, { backgroundColor: surfaceMutedColor }]}>
            <View
              style={{
                height: "100%",
                width: `${batteryLevel}%`,
                backgroundColor:
                  batteryLevel > 50
                    ? successColor
                    : batteryLevel > 20
                      ? warningColor
                      : dangerColor,
                borderRadius: 999,
              }}
            />
          </View>
        </View>
      </View>

      <View style={[styles.sectionRow, isTablet && styles.sectionRowTablet]}>
        <View style={[styles.sectionFlex, isTablet && styles.sectionFlexWide]}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: isRoofOptimal ? successSoft : warningSoft,
                borderColor: isRoofOptimal ? successColor : warningColor,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.cardTitle, { color: textColor }]}>Έλεγχος Οροφής</Text>
                <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>Προσαρμογή ανάλογα με τον καιρό.</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setRoofLocked((prev) => !prev)}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    backgroundColor: roofLocked ? dangerColor : surfaceMutedColor,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={roofLocked ? "lock" : "lock-open-variant"}
                  size={18}
                  color={roofLocked ? backgroundColor : textColor}
                />
              </Pressable>
            </View>

            <View style={[styles.roofVisual, { backgroundColor: surfaceMutedColor }]}> 
              <View style={[styles.roofBus, { backgroundColor: surfaceColor, borderColor: cardBorder }]}>
                <View style={styles.roofWindows}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <View
                      key={`window-${index}`}
                      style={[styles.roofWindow, { backgroundColor: infoSoft }]}
                    />
                  ))}
                </View>
              </View>
              <View
                style={[
                  styles.roofPanel,
                  {
                    backgroundColor: roofStatus === "open" ? warningColor : surfaceMutedColor,
                    top: roofStatus === "open" ? 18 : 44,
                  },
                ]}
              >
                {roofStatus === "open" ? (
                  <View style={styles.roofPanelGrid}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <View
                        key={`panel-${index}`}
                        style={[styles.roofPanelCell, { backgroundColor: withAlpha(backgroundColor, 0.25) }]}
                      />
                    ))}
                  </View>
                ) : null}
              </View>
              <View
                style={[
                  styles.roofStatusPill,
                  {
                    backgroundColor: roofStatus === "open" ? warningColor : iconColor,
                  },
                ]}
              >
                <Text style={[styles.roofStatusText, { color: backgroundColor }]}> 
                  {roofStatus === "open" ? "↑ Ανοιχτή" : "↓ Κλειστή"}
                </Text>
              </View>
            </View>

            <View style={styles.roofActions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => toggleRoof("open")}
                disabled={roofLocked || roofStatus === "open"}
                style={({ pressed }) => [
                  styles.roofButton,
                  {
                    backgroundColor:
                      roofLocked || roofStatus === "open" ? surfaceMutedColor : successColor,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons name="arrow-up" size={16} color={roofLocked || roofStatus === "open" ? mutedTextColor : backgroundColor} />
                <Text style={[styles.roofButtonText, { color: roofLocked || roofStatus === "open" ? mutedTextColor : backgroundColor }]}>Άνοιγμα</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => toggleRoof("closed")}
                disabled={roofLocked || roofStatus === "closed"}
                style={({ pressed }) => [
                  styles.roofButton,
                  {
                    backgroundColor:
                      roofLocked || roofStatus === "closed" ? surfaceMutedColor : infoColor,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons name="arrow-down" size={16} color={roofLocked || roofStatus === "closed" ? mutedTextColor : backgroundColor} />
                <Text style={[styles.roofButtonText, { color: roofLocked || roofStatus === "closed" ? mutedTextColor : backgroundColor }]}>Κλείσιμο</Text>
              </Pressable>
            </View>

            {!isRoofOptimal ? (
              <View style={[styles.noticeCard, { backgroundColor: warningSoft, borderColor: warningColor }]}> 
                <Text style={[styles.noticeText, { color: warningColor }]}> 
                  {weather === "sunny"
                    ? "Προτείνεται άνοιγμα οροφής για μέγιστη παραγωγή ενέργειας."
                    : "Προτείνεται κλείσιμο οροφής λόγω βροχής ή συννεφιάς."}
                </Text>
              </View>
            ) : null}

            {roofLocked ? (
              <View style={[styles.noticeCard, { backgroundColor: dangerSoft, borderColor: dangerColor }]}> 
                <Text style={[styles.noticeText, { color: dangerColor }]}> 
                  Η οροφή είναι κλειδωμένη. Ξεκλειδώστε για αλλαγές.
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={[styles.sectionFlex, isTablet && styles.sectionFlexNarrow]}>
          <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}> 
            <Text style={[styles.cardTitle, { color: textColor }]}>Καιρικές Συνθήκες</Text>
            <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>Επιλέξτε το προφίλ ημέρας.</Text>
            <View style={styles.weatherButtons}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setWeather("sunny")}
                style={({ pressed }) => [
                  styles.weatherButton,
                  {
                    backgroundColor: weather === "sunny" ? warningColor : surfaceMutedColor,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="weather-sunny"
                  size={26}
                  color={weather === "sunny" ? backgroundColor : warningColor}
                />
                <Text
                  style={[
                    styles.weatherLabel,
                    { color: weather === "sunny" ? backgroundColor : textColor },
                  ]}
                >
                  Ηλιόλουστο
                </Text>
                <Text style={[styles.weatherMeta, { color: weather === "sunny" ? backgroundColor : mutedTextColor }]}>Μέγιστη παραγωγή</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={() => setWeather("cloudy")}
                style={({ pressed }) => [
                  styles.weatherButton,
                  {
                    backgroundColor: weather === "cloudy" ? iconColor : surfaceMutedColor,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="weather-rainy"
                  size={26}
                  color={weather === "cloudy" ? backgroundColor : iconColor}
                />
                <Text
                  style={[
                    styles.weatherLabel,
                    { color: weather === "cloudy" ? backgroundColor : textColor },
                  ]}
                >
                  Συννεφιά/Βροχή
                </Text>
                <Text style={[styles.weatherMeta, { color: weather === "cloudy" ? backgroundColor : mutedTextColor }]}>Μειωμένη παραγωγή</Text>
              </Pressable>
            </View>

            <View style={[styles.recommendCard, { backgroundColor: surfaceMutedColor }]}> 
              <Text style={[styles.recommendLabel, { color: mutedTextColor }]}>Πρόταση συστήματος</Text>
              <Text style={[styles.recommendValue, { color: textColor }]}> 
                {weather === "sunny"
                  ? "✓ Οροφή ανοιχτή για μέγιστη παραγωγή"
                  : "⚠️ Κλείστε την οροφή λόγω βροχής"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.sectionRow, isTablet && styles.sectionRowTablet]}>
        <View style={[styles.sectionFlex, isTablet && styles.sectionFlexWide]}>
          <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}> 
            <View style={styles.cardHeaderRow}>
              <View style={[styles.statIcon, { backgroundColor: warningColor }]}> 
                <MaterialCommunityIcons name="solar-power" size={20} color={backgroundColor} />
              </View>
              <View>
                <Text style={[styles.cardTitle, { color: textColor }]}>Φωτοβολταϊκά Πάνελ</Text>
                <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>Παραγωγή σε πραγματικό χρόνο</Text>
              </View>
            </View>

            <View style={styles.solarValueRow}>
              <Text style={[styles.solarValue, { color: warningColor }]}>{Math.round(solarProduction)}</Text>
              <Text style={[styles.solarUnit, { color: mutedTextColor }]}>Watts</Text>
            </View>
            <Text style={[styles.solarMeta, { color: mutedTextColor }]}>{Math.round(solarEfficiency)}% απόδοση</Text>

            <View style={styles.progressBlock}>
              <View style={styles.progressRow}>
                <Text style={[styles.progressLabel, { color: mutedTextColor }]}>Τρέχουσα παραγωγή</Text>
                <Text style={[styles.progressLabel, { color: mutedTextColor }]}>Μέγιστο {maxSolar}W</Text>
              </View>
              <View style={[styles.progressTrack, { backgroundColor: surfaceMutedColor }]}>
                <View
                  style={{
                    width: `${solarEfficiency}%`,
                    height: "100%",
                    backgroundColor: warningColor,
                    borderRadius: 999,
                  }}
                />
              </View>
            </View>

            <View style={[styles.panelGrid, { backgroundColor: surfaceMutedColor }]}> 
              {solarPanels.map((panel, index) => (
                <View
                  key={`panel-${index}`}
                  style={{
                    width: "14%",
                    aspectRatio: 1,
                    borderRadius: 4,
                    backgroundColor: warningColor,
                    opacity: panel / 100,
                  }}
                />
              ))}
            </View>

            <View
              style={[
                styles.noticeCard,
                {
                  backgroundColor: weather === "sunny" ? successSoft : warningSoft,
                  borderColor: weather === "sunny" ? successColor : warningColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.noticeText,
                  { color: weather === "sunny" ? successColor : warningColor },
                ]}
              >
                {weather === "sunny"
                  ? "Βέλτιστες συνθήκες για μέγιστη παραγωγή."
                  : "Η παραγωγή επηρεάζεται από τις καιρικές συνθήκες."}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.sectionFlex, isTablet && styles.sectionFlexWide]}>
          <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}> 
            <View style={styles.cardHeaderRow}>
              <View style={[styles.statIcon, { backgroundColor: infoColor }]}> 
                <MaterialCommunityIcons name="flash" size={20} color={backgroundColor} />
              </View>
              <View>
                <Text style={[styles.cardTitle, { color: textColor }]}>Κατανάλωση Συστημάτων</Text>
                <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>Ανάλυση & έλεγχος</Text>
              </View>
            </View>

            <View style={styles.solarValueRow}>
              <Text style={[styles.solarValue, { color: infoColor }]}>{Math.round(systemConsumption)}</Text>
              <Text style={[styles.solarUnit, { color: mutedTextColor }]}>Watts</Text>
            </View>

            <View style={styles.systemRow}>
              <View style={[styles.systemCard, { backgroundColor: surfaceMutedColor }]}> 
                <View style={styles.systemHeader}>
                  <View style={styles.systemLabelRow}>
                    <MaterialCommunityIcons name="fan" size={16} color={acEnabled ? infoColor : mutedTextColor} />
                    <Text style={[styles.systemLabel, { color: textColor }]}>Κλιματισμός</Text>
                  </View>
                  <Text style={[styles.systemValue, { color: infoColor }]}>{acConsumption}W</Text>
                </View>
                <View style={styles.systemHeader}>
                  <Text style={[styles.systemMeta, { color: mutedTextColor }]}>Κατάσταση</Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => setAcEnabled((prev) => !prev)}
                    style={({ pressed }) => [
                      styles.pillButton,
                      {
                        backgroundColor: acEnabled ? infoColor : surfaceColor,
                        borderColor: acEnabled ? infoColor : cardBorder,
                        opacity: pressed ? 0.85 : 1,
                      },
                    ]}
                  >
                    <Text style={[styles.pillButtonText, { color: acEnabled ? backgroundColor : mutedTextColor }]}> 
                      {acEnabled ? "ON" : "OFF"}
                    </Text>
                  </Pressable>
                </View>
                <View style={[styles.progressTrack, { backgroundColor: surfaceColor }]}>
                  <View
                    style={{
                      width: acEnabled ? "60%" : "0%",
                      height: "100%",
                      backgroundColor: infoColor,
                      borderRadius: 999,
                    }}
                  />
                </View>
              </View>

              <View style={[styles.systemCard, { backgroundColor: surfaceMutedColor }]}> 
                <View style={styles.systemHeader}>
                  <View style={styles.systemLabelRow}>
                    <MaterialCommunityIcons name="lightbulb-on" size={16} color={warningColor} />
                    <Text style={[styles.systemLabel, { color: textColor }]}>Φωτισμός</Text>
                  </View>
                  <Text style={[styles.systemValue, { color: warningColor }]}>{lightsConsumption}W</Text>
                </View>
                <View style={styles.lightsControls}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => adjustLights(-10)}
                    style={({ pressed }) => [
                      styles.iconButton,
                      {
                        backgroundColor: surfaceColor,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons name="minus" size={16} color={textColor} />
                  </Pressable>
                  <View style={[styles.progressTrack, { backgroundColor: surfaceColor, flex: 1 }]}> 
                    <View
                      style={{
                        width: `${lightsLevel}%`,
                        height: "100%",
                        backgroundColor: warningColor,
                        borderRadius: 999,
                      }}
                    />
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => adjustLights(10)}
                    style={({ pressed }) => [
                      styles.iconButton,
                      {
                        backgroundColor: surfaceColor,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons name="plus" size={16} color={textColor} />
                  </Pressable>
                  <Text style={[styles.lightsValue, { color: mutedTextColor }]}>{lightsLevel}%</Text>
                </View>
              </View>

              <View style={[styles.systemCard, { backgroundColor: surfaceMutedColor }]}> 
                <View style={styles.systemHeader}>
                  <View style={styles.systemLabelRow}>
                    <MaterialCommunityIcons name="cpu-64-bit" size={16} color={tintColor} />
                    <Text style={[styles.systemLabel, { color: textColor }]}>Λοιπά Συστήματα</Text>
                  </View>
                  <Text style={[styles.systemValue, { color: tintColor }]}>{systemsConsumption}W</Text>
                </View>
                <View style={[styles.progressTrack, { backgroundColor: surfaceColor }]}>
                  <View
                    style={{
                      width: "20%",
                      height: "100%",
                      backgroundColor: tintColor,
                      borderRadius: 999,
                    }}
                  />
                </View>
                <Text style={[styles.systemMeta, { color: mutedTextColor }]}>Ρομπότ, αισθητήρες, οθόνες</Text>
              </View>

              {totalSaved > 0 ? (
                <View style={[styles.noticeCard, { backgroundColor: successSoft, borderColor: successColor }]}> 
                  <Text style={[styles.noticeText, { color: successColor }]}> 
                    Εξοικονόμηση {totalSaved}W από απενεργοποίηση κλιματισμού.
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: cardBorder }]}> 
        <View style={styles.cardHeaderRow}>
          <View style={[styles.statIcon, { backgroundColor: successColor }]}> 
            <MaterialCommunityIcons name="battery-high" size={20} color={backgroundColor} />
          </View>
          <View>
            <Text style={[styles.cardTitle, { color: textColor }]}>Αποθήκευση Ενέργειας</Text>
            <Text style={[styles.cardSubtitle, { color: mutedTextColor }]}>Κατάσταση μπαταρίας λιθίου</Text>
          </View>
        </View>

        <View style={styles.storageRow}>
          <View style={styles.storageColumn}>
            <View style={styles.storageHeader}>
              <Text style={[styles.progressLabel, { color: mutedTextColor }]}>Επίπεδο φόρτισης</Text>
              <Text style={[styles.storageValue, { color: batteryLevel > 50 ? successColor : batteryLevel > 20 ? warningColor : dangerColor }]}> 
                {Math.round(batteryLevel)}%
              </Text>
            </View>
            <View style={[styles.batteryShell, { borderColor: batteryLevel > 50 ? successColor : batteryLevel > 20 ? warningColor : dangerColor }]}> 
              <View style={[styles.batteryCap, { backgroundColor: batteryLevel > 50 ? successColor : batteryLevel > 20 ? warningColor : dangerColor }]} />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${batteryLevel}%`,
                  backgroundColor: batteryLevel > 50 ? successColor : batteryLevel > 20 ? warningColor : dangerColor,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              />
            </View>
            <Text style={[styles.storageMeta, { color: mutedTextColor }]}>{storedEnergy} / {batteryCapacity} Wh</Text>
          </View>

          <View style={[styles.storageColumn, styles.storageStatusCard, { backgroundColor: isCharging ? successSoft : warningSoft, borderColor: isCharging ? successColor : warningColor }]}> 
            <View style={styles.storageStatusRow}>
              <MaterialCommunityIcons name={isCharging ? "trending-up" : "trending-down"} size={24} color={isCharging ? successColor : warningColor} />
              <View>
                <Text style={[styles.progressLabel, { color: isCharging ? successColor : warningColor }]}> 
                  {isCharging ? "Φόρτιση" : "Εκφόρτιση"}
                </Text>
                <Text style={[styles.storageValue, { color: isCharging ? successColor : warningColor }]}>{isCharging ? "+" : ""}{Math.round(netEnergy)}W</Text>
              </View>
            </View>
            <Text style={[styles.storageMeta, { color: textColor }]}> 
              {isCharging ? "Χρόνος μέχρι πλήρη φόρτιση" : "Εναπομένων χρόνος"}
            </Text>
            <Text style={[styles.storageTime, { color: textColor }]}> 
              {Math.floor(timeRemainingMinutes / 60)}ώ {Math.round(timeRemainingMinutes % 60)}λ
            </Text>
            <View style={[styles.progressTrack, { backgroundColor: surfaceColor }]}> 
              <View
                style={{
                  width: `${batteryLevel}%`,
                  height: "100%",
                  backgroundColor: isCharging ? successColor : warningColor,
                  borderRadius: 999,
                }}
              />
            </View>
          </View>

          <View style={styles.storageColumn}>
            <Text style={[styles.progressLabel, { color: mutedTextColor }]}>Ροή ενέργειας</Text>
            <View style={[styles.flowCard, { backgroundColor: surfaceMutedColor }]}> 
              <Text style={[styles.flowMeta, { color: mutedTextColor }]}>Φωτοβολταϊκά</Text>
              <Text style={[styles.flowValue, { color: warningColor }]}>↓ Παραγωγή</Text>
              <Text style={[styles.flowHint, { color: textColor }]}>Πάνελ → Μπαταρία</Text>
            </View>
            <View style={[styles.flowCard, { backgroundColor: surfaceMutedColor }]}> 
              <Text style={[styles.flowMeta, { color: mutedTextColor }]}>Συστήματα</Text>
              <Text style={[styles.flowValue, { color: infoColor }]}>↑ Κατανάλωση</Text>
              <Text style={[styles.flowHint, { color: textColor }]}>Μπαταρία → Λεωφορείο</Text>
            </View>
            <View style={[styles.noticeCard, { backgroundColor: isCharging ? successSoft : warningSoft, borderColor: isCharging ? successColor : warningColor }]}> 
              <Text style={[styles.noticeText, { color: isCharging ? successColor : warningColor }]}> 
                {isCharging ? "Παραγωγή > Κατανάλωση" : "Κατανάλωση > Παραγωγή"}
              </Text>
            </View>
          </View>
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
  headerBadgeRow: {
    flexDirection: "row",
  },
  headerBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  statCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  statMeta: {
    fontSize: 12,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  sectionRow: {
    gap: 16,
  },
  sectionRowTablet: {
    flexDirection: "row",
  },
  sectionFlex: {
    flex: 1,
  },
  sectionFlexWide: {
    flex: 2,
  },
  sectionFlexNarrow: {
    flex: 1,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  roofVisual: {
    borderRadius: 16,
    height: 170,
    justifyContent: "center",
  },
  roofBus: {
    position: "absolute",
    bottom: 16,
    left: "12%",
    right: "12%",
    height: 90,
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  roofWindows: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  roofWindow: {
    flex: 1,
    height: 42,
    borderRadius: 8,
  },
  roofPanel: {
    position: "absolute",
    left: "12%",
    right: "12%",
    height: 36,
    borderRadius: 12,
    padding: 6,
  },
  roofPanelGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    flex: 1,
  },
  roofPanelCell: {
    flex: 1,
    borderRadius: 6,
  },
  roofStatusPill: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  roofStatusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  roofActions: {
    flexDirection: "row",
    gap: 12,
  },
  roofButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  roofButtonText: {
    fontSize: 13,
    fontWeight: "600",
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
  weatherButtons: {
    gap: 12,
  },
  weatherButton: {
    borderRadius: 14,
    padding: 16,
    gap: 6,
    alignItems: "center",
  },
  weatherLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  weatherMeta: {
    fontSize: 12,
  },
  recommendCard: {
    borderRadius: 12,
    padding: 12,
  },
  recommendLabel: {
    fontSize: 11,
    textTransform: "uppercase",
  },
  recommendValue: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
  },
  solarValueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  solarValue: {
    fontSize: 32,
    fontWeight: "700",
  },
  solarUnit: {
    fontSize: 14,
    marginBottom: 4,
  },
  solarMeta: {
    fontSize: 12,
  },
  progressBlock: {
    gap: 8,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 12,
  },
  panelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    padding: 12,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  systemRow: {
    gap: 12,
  },
  systemCard: {
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  systemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  systemLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  systemLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  systemValue: {
    fontSize: 13,
    fontWeight: "700",
  },
  systemMeta: {
    fontSize: 11,
  },
  pillButton: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  pillButtonText: {
    fontSize: 11,
    fontWeight: "700",
  },
  lightsControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  lightsValue: {
    fontSize: 12,
  },
  storageRow: {
    flexDirection: "column",
    gap: 16,
  },
  storageColumn: {
    gap: 10,
  },
  storageStatusCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  storageHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  storageValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  storageMeta: {
    fontSize: 12,
  },
  storageTime: {
    fontSize: 16,
    fontWeight: "700",
  },
  storageStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  batteryShell: {
    height: 130,
    width: 80,
    borderRadius: 16,
    borderWidth: 3,
    alignSelf: "center",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  batteryCap: {
    position: "absolute",
    top: -10,
    left: "32%",
    right: "32%",
    height: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  flowCard: {
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  flowMeta: {
    fontSize: 11,
  },
  flowValue: {
    fontSize: 12,
    fontWeight: "700",
  },
  flowHint: {
    fontSize: 13,
    fontWeight: "600",
  },
});
