import {
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import ArrowLeftSVG from '../../components/svg/ArrowLeftSVG';
import {useState} from 'react';
import {alert} from '../utils/alerts';
import {signup} from '../utils/networking';
import AvatarSVG from '../../components/svg/AvatarSVG';
import LockSVG from '../../components/svg/LockSVG';
import Button from '../../components/Button';

const Signup = (props: any): JSX.Element => {
  const {navigation} = props;

  const [payload, setPayload] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
  });
  const [repeatPassword, setRepeatPassword] = useState('');

  const submit = async () => {
    if (
      !payload.username ||
      !payload.password ||
      !payload.email ||
      !payload.name ||
      !repeatPassword
    ) {
      return alert(
        'Error',
        'Some fields are missing, please make sure to fill them.',
      );
    }
    if (payload.password !== repeatPassword) {
      return alert('Error', 'Passwords do not match');
    }
    await signup(payload, navigation);
  };

  return (
    <ScrollView
      scrollEnabled={true}
      style={{
        ...styles.sectionContainer,
        height: '100%',
        backgroundColor: '#22343C',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <ArrowLeftSVG
          width={20}
          height={20}
          style={{
            color: '#fff',
          }}
        />
      </TouchableOpacity>

      <View style={styles.decorativeSquare} />
      <Text style={styles.sectionTitle}>Hello!</Text>
      <Text style={styles.sectionSubTitle}>Make a new account</Text>
      <View style={styles.inputView}>
        <View style={styles.decorativeSquareUsername}>
          <AvatarSVG style={{color: '#FFC542'}} />
        </View>
        <TextInput
          placeholder="Your full name"
          style={styles.input}
          value={payload.name || ''}
          onChangeText={text => {
            setPayload({...payload, name: text});
          }}
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.decorativeSquareUsername}>
          <AvatarSVG style={{color: '#FFC542'}} />
        </View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={payload.email || ''}
          autoCapitalize="none"
          onChangeText={text => {
            setPayload({...payload, email: text});
          }}
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.decorativeSquareUsername}>
          <AvatarSVG style={{color: '#FFC542'}} />
        </View>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={payload.username || ''}
          autoCapitalize="none"
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
          style={styles.input}
          value={payload.password || ''}
          autoCapitalize="none"
          onChangeText={text => {
            setPayload({...payload, password: text});
          }}
          secureTextEntry
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.decorativeSquarePassword}>
          <LockSVG style={{color: '#FF575F'}} />
        </View>
        <TextInput
          placeholder="Repeat your password"
          style={styles.input}
          value={repeatPassword}
          autoCapitalize="none"
          onChangeText={text => {
            setRepeatPassword(text);
          }}
          secureTextEntry
        />
      </View>
      <Button onPress={submit} text="Next" styleProps={styles.signInButton}/>
    </ScrollView>
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
    marginBottom: 50,
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
    marginTop: 45,
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
    paddingTop: 20,
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

export default Signup;
