import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AdicionarProduto() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [desconto, setDesconto] = useState("");
  const [urlImagem, setUrlImagem] = useState("");

 const salvarProduto = () => {
  if (!nome || !descricao || !preco || !desconto || !urlImagem) {
    if (Platform.OS === "web") {
      window.alert("Preencha todos os campos.");
    } else {
      Alert.alert("Atenção", "Preencha todos os campos.");
    }
    return;
  }

  if (Platform.OS === "web") {
    window.alert("Produto salvo com sucesso!");
    router.back();
    return;
  }

  Alert.alert("Sucesso", "Produto salvo com sucesso!", [
    {
      text: "OK",
      onPress: () => router.back(),
    },
  ]);
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>

          <Text style={styles.title}>Adicionar produto</Text>
        </View>

        {/* Nome */}
        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder=""
          />
        </View>

        {/* Descrição */}
        <View style={styles.field}>
          <Text style={styles.label}>Descrição</Text>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Preço */}
        <View style={styles.field}>
          <Text style={styles.label}>Preço (R$)</Text>

          <TextInput
            style={styles.input}
            value={preco}
            onChangeText={setPreco}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Desconto */}
        <View style={styles.field}>
          <Text style={styles.label}>Desconto (%)</Text>

          <TextInput
            style={styles.input}
            value={desconto}
            onChangeText={setDesconto}
            keyboardType="decimal-pad"
          />
        </View>

        {/* URL da imagem */}
        <View style={styles.field}>
          <Text style={styles.label}>URL da imagem</Text>

          <TextInput
            style={styles.input}
            value={urlImagem}
            onChangeText={setUrlImagem}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>

        {/* Botão salvar */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={salvarProduto}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  field: {
    marginBottom: 14,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#222",
    marginBottom: 5,
  },

  input: {
    height: 38,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    paddingHorizontal: 9,
    fontSize: 13,
    color: "#222",
    backgroundColor: "#fff",
  },

  descriptionInput: {
    height: 42,
  },

  saveButton: {
    height: 38,
    backgroundColor: "#2867df",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});