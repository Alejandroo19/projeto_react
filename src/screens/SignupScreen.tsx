// src/screens/SignupScreen.tsx

import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../redux/Hooks'
// import { signupThunk } from '../redux/slices/authSlice'  // mais à frente

// esquema de validação
const SignupSchema = Yup.object().shape({
  email:    Yup.string().email('E-mail inválido').required('Obrigatório'),
  password: Yup.string().min(6, 'Pelo menos 6 caracteres').required('Obrigatório'),
})

export default function SignupScreen({ navigation }: any) {
  const dispatch = useAppDispatch()

  const handleSubmit = (values: { email: string; password: string }) => {
    // por enquanto, só um console.log:
    console.log('signup form:', values)

    // quando implementar o thunk:
    // dispatch(signupThunk(values))
    //   .unwrap()
    //   .then(() => navigation.replace('App'))  // ou navegue para o tab
    //   .catch(err => Alert.alert('Erro', err.message))

    // simula sucesso:
    Alert.alert('Sucesso', 'Conta criada com sucesso!')
    navigation.replace('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
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
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Já tem conta? Entre</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  error: {
    color: '#cc0000',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#0063DE',
    padding: 12,
    borderRadius: 4,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  link: {
    color: '#0063DE',
    textAlign: 'center',
    marginTop: 16,
  },
})
