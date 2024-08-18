import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Switch,
  Image,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import COLORS from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase';

export default function Example() {
  const [value, setValue] = React.useState(0);
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const handlePasswordReset = () => {
    const userEmail = auth.currentUser?.email; // Get the current user's email

    if (userEmail) {
      auth
        .sendPasswordResetEmail(userEmail)
        .then(() => {
          Alert.alert(
            'Password Reset',
            'A password reset link has been sent to your email.'
          );
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Error', 'No user is currently signed in.');
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.secondary, COLORS.primary]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          <View style={styles.profile}>
            <View style={styles.profileHeader}>
              <Image
                alt=""
                source={require('../assets/blank-pfp.png')}
                style={styles.profileAvatar}
              />

              <View>
                <Text style={styles.profileName}>Goutham Mahesh</Text>
                <Text style={styles.profileHandle}>test@test.com</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => { /* handle onPress */ }}>
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>
                <FeatherIcon color="#fff" name="edit-3" size={16} />
              </View>
            </TouchableOpacity>
          </View>

          {value === 0 && (
            <View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Accessibility</Text>
                <View style={styles.sectionBody}>
                  <View style={[styles.rowWrapper, styles.rowFirst]}>
                    <TouchableOpacity onPress={() => { /* handle onPress */ }} style={styles.row}>
                      <Text style={styles.rowLabel}>Language</Text>
                      <View style={styles.rowSpacer} />
                      <Text style={styles.rowValue}>English</Text>
                      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <View style={styles.row}>
                      <Text style={styles.rowLabel}>Push Notifications</Text>
                      <View style={styles.rowSpacer} />
                      <Switch
                        onValueChange={(pushNotifications) => setForm({ ...form, pushNotifications })}
                        style={{
                          transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                        }}
                        value={form.pushNotifications}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Security</Text>
                <View style={styles.sectionBody}>
                  <View style={[styles.rowWrapper, styles.rowFirst]}>
                    <TouchableOpacity onPress={() => { /* handle onPress */ }} style={styles.row}>
                      <Text style={styles.rowLabel}>Change Email</Text>
                      <View style={styles.rowSpacer} />
                      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rowWrapper}>
                    <TouchableOpacity onPress={handlePasswordReset} style={styles.row}>
                      <Text style={styles.rowLabel}>Change Password</Text>
                      <View style={styles.rowSpacer} />
                      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Support</Text>
                <View style={styles.sectionBody}>
                  <View style={[styles.rowWrapper, styles.rowFirst]}>
                    <TouchableOpacity onPress={() => { /* handle onPress */ }} style={styles.row}>
                      <Text style={styles.rowLabel}>Contact Us</Text>
                      <View style={styles.rowSpacer} />
                      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    left: '5%',
    width: '90%',
    borderRadius: 15,
    paddingTop: '6%',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3d3d3d',
  },
  profileHandle: {
    marginTop: 4,
    fontSize: 15,
    color: '#989898',
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    marginTop: 12,
  },
  sectionBody: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    paddingLeft: 24,
    width: '90%',
    left: '5%',
    borderRadius: 15,
  },
  sectionTitle: {
    marginTop: 0,
    marginHorizontal: 24,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 44,
    paddingRight: 24,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#2c2c2c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#7f7f7f',
    marginRight: 4,
  },
});
