// src/screens/LoginScreen.tsx
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup   from 'yup'
import { useAppDispatch } from '../redux/Hooks'
import { loginThunk }     from '../redux/slices/authSlice'

const LoginSchema = Yup.object().shape({
  email:    Yup.string().email('E-mail inválido').required('Obrigatório'),
  password: Yup.string().min(6, 'Pelo menos 6 caracteres').required('Obrigatório'),
})

export default function LoginScreen({ navigation }: any) {
  const dispatch = useAppDispatch()

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      // despacha o thunk e aguarda o token
      await dispatch(loginThunk(values)).unwrap()
      // se der certo, navega para as tabs
      navigation.replace('Lista')  // ou o nome da sua Tab inicial
    } catch (err: any) {
      Alert.alert('Erro ao logar', err.message || 'Tente novamente')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.link}>Criar conta</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title:     { fontSize: 28, marginBottom: 24, textAlign: 'center' },
  input:     { borderWidth: 1, borderColor: '#999', borderRadius: 4, padding: 12, marginBottom: 8 },
  error:     { color: '#cc0000', marginBottom: 8 },
  button:    { backgroundColor: '#0063DE', padding: 12, borderRadius: 4, marginTop: 12 },
  buttonText:{ color: '#fff', textAlign: 'center', fontWeight: '600' },
  link:      { color: '#0063DE', textAlign: 'center', marginTop: 16 },
})
