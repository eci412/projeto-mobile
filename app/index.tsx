import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../store/store";

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const dispatch = useDispatch();
const handleLogin = () => {
  const emailVazio = email.trim() === "";
  const senhaVazia = senha.trim() === "";

  setErroEmail(emailVazio);
  setErroSenha(senhaVazia);
  setMensagem("");

  if (emailVazio || senhaVazia) {
    return;
  }

  if (
    email !== "marina.costa@gmail.com" ||
    senha !== "123456"
  ) {
    setErroEmail(false);
    setErroSenha(false);
    setMensagem("Username ou senha inválidos");
    return;
  }

  dispatch(login(email));
  router.push("/produtos");
};
  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.welcome}>Bem-vindo de volta!</Text>

        <Text style={styles.subtitle}>
          Insira seus dados para entrar na sua conta.
        </Text>
      </View>

      <View style={styles.card}>
        
        {mensagem !== "" && (
  <Text style={styles.erroMensagem}>{mensagem}</Text>
)}

        <Text style={styles.label}>E-mail</Text>

        <TextInput
          style={[styles.input, erroEmail && styles.inputErro]}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={(texto) => {
            setEmail(texto);
            setErroEmail(false);
            setMensagem("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {erroEmail && (
  <View style={styles.erroContainer}>
    <Ionicons
      name="alert-circle-outline"
      size={16}
      color="#e53935"
    />
    <Text style={styles.erroTexto}>Campo obrigatório</Text>
  </View>
)}

        <Text style={styles.label}>Senha</Text>

             <View style={styles.senhaContainer}>
          <TextInput
            style={[styles.input, erroSenha && styles.inputErro]}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              setErroSenha(false);
              setMensagem("");
            }}
            secureTextEntry={!mostrarSenha}
          />

          <TouchableOpacity
            style={styles.iconeSenha}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Ionicons
              name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
              size={18}
              color="#777"
            />
          </TouchableOpacity>
        </View>

       {erroSenha && !mensagem && (
  <View style={styles.erroContainer}>
    <Ionicons
      name="alert-circle-outline"
      size={16}
      color="#e53935"
    />
    <Text style={styles.erroTexto}>Campo obrigatório</Text>
  </View>
)}
        {mensagem !== "" && (
          <Text style={styles.erroMensagem}>{mensagem}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  topo: {
    height: 300,
    backgroundColor: "#2870e8",
    alignItems: "center",
    paddingTop: 80,
  },

  welcome: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -80,
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginBottom: 5,
    fontSize: 15,
  },

  senhaContainer: {
  position: "relative",
},

iconeSenha: {
  position: "absolute",
  right: 12,
  top: 14,
},

  inputErro: {
    borderColor: "#e53935",
  },

  erroContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
  gap: 4,
},

  erroTexto: {
    color: "#e53935",
    fontSize: 13,
    marginBottom: 10,
  },

  erroMensagem: {
  color: "#e53935",
  fontSize: 16,
  marginBottom: 18,
},

  button: {
    height: 48,
    backgroundColor: "#2870e8",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});