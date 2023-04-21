import {
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import { login } from '../utils/networking';
import { SafeAreaView } from 'react-native-safe-area-context';
import AvatarSVG from '../../components/svg/AvatarSVG';
import LockSVG from '../../components/svg/LockSVG';

const Login = (props: any): JSX.Element => {
  const {navigation} = props;

  const [payload, setPayload] = useState({
    username: '',
    password: '',
  });

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          ...styles.sectionContainer,
          height: '100%',
          backgroundColor: '#22343C',
        }}>
        <View style={styles.decorativeSquare} />
        <Text style={styles.sectionTitle}>Welcome!</Text>
        <Text style={styles.sectionSubTitle}>Sign in to continue</Text>
        <View style={styles.inputView}>
          <View style={styles.decorativeSquareUsername}>
            <AvatarSVG style={{color: '#FFC542'}} />
          </View>
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            style={styles.input}
            value={payload.username || ''}
            onChangeText={text => {
              setPayload({...payload, username: text});
            }}
          />
        </View>
        <View style={styles.inputView}>
          <View style={styles.decorativeSquarePassword}>
            <LockSVG style={{color: '#FF575F'}} />
          </View>
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            style={styles.input}
            value={payload.password || ''}
            onChangeText={text => {
              setPayload({...payload, password: text});
            }}
            secureTextEntry
          />
        </View>
        {/* sign in button */}
        <TouchableOpacity
          onPress={() => login(payload, navigation)}
          style={styles.signInButton}>
          <Text style={{fontSize: 16, fontWeight: '900'}}>Sign in</Text>
        </TouchableOpacity>

        {/* forgot password button */}
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
          style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.forgotPasswordText}>Change your password</Text>
        </TouchableOpacity>

        {/* sign up button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}
          style={styles.createAnAccountButton}>
          <Text style={{fontSize: 16, fontWeight: '900', color: '#3DD598'}}>
            Create an account
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPasswordText: {
    marginTop: 20,
    fontSize: 14,
    color: '#96A7AF',
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#40DF9F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    borderRadius: 12,
    marginTop: 55,
  },
  createAnAccountButton: {
    backgroundColor: '#286053',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    borderRadius: 12,
    marginTop: 55,
  },
  decorativeSquare: {
    marginTop: 70,
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#40DF9F',
  },
  decorativeSquareUsername: {
    borderRadius: 12,
    backgroundColor: '#625B39',
    width: 38,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeSquarePassword: {
    borderRadius: 12,
    backgroundColor: '#623A42',
    width: 38,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionSubTitle: {
    marginTop: 16,
    fontSize: 24,
    color: '#96A7AF',
  },
  sectionTitle: {
    marginTop: 32,
    fontSize: 42,
    fontWeight: '900',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  inputView: {
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  input: {
    fontSize: 18,
    color: '#96A7AF',
  },
});

export default Login;
