import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({onPress, color, text, styleProps}: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.button, backgroundColor: color, ...styleProps}}>
            <Text style={{fontSize: 16, fontWeight: '900', color: '#fff'}}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      display: 'flex',
      justifyContent: 'center',
      height: 58,
      borderRadius: 12,
    },
});

export default Button