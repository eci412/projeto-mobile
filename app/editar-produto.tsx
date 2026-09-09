import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditarProduto() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [desconto, setDesconto] = useState("");
  const [urlImagem, setUrlImagem] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [modalEditar, setModalEditar] = useState(false);

  useEffect(() => {
    async function buscarProduto() {
      try {
        const resposta = await axios.get(
          `https://dummyjson.com/products/${id}`
        );

        const produto = resposta.data;

        setNome(produto.title);
        setDescricao(produto.description);
        setPreco(String(produto.price));
        setDesconto(String(produto.discountPercentage));
        setUrlImagem(produto.thumbnail);
      } catch (erro) {
        console.log("Erro ao buscar produto:", erro);
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      buscarProduto();
    }
  }, [id]);

  const salvarAlteracoes = () => {
    if (!nome || !descricao || !preco || !desconto || !urlImagem) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    setModalEditar(true);
  };

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.formulario}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecalho}>
          <TouchableOpacity
            style={styles.botaoVoltar}
           onPress={() => router.replace("/produtos")} 
          >
            <Text style={styles.seta}>←</Text>
          </TouchableOpacity>

          <Text style={styles.tituloCabecalho}>
            Editar produto
          </Text>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Desconto (%)</Text>
        <TextInput
          style={styles.input}
          value={desconto}
          onChangeText={setDesconto}
          keyboardType="numeric"
        />

        <Text style={styles.label}>URL da imagem</Text>
        <TextInput
          style={styles.input}
          value={urlImagem}
          onChangeText={setUrlImagem}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={salvarAlteracoes}
        >
          <Text style={styles.textoSalvar}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={modalEditar}
        transparent
        animationType="fade"
        onRequestClose={() => setModalEditar(false)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.caixaModal}>
            <Text style={styles.tituloModal}>
              Editar produto
            </Text>

            <Text style={styles.mensagemModal}>
              Você tem certeza que deseja editar esse produto?
              Essa ação não poderá ser desfeita.
            </Text>

            <View style={styles.botoesModal}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => setModalEditar(false)}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoConfirmar}
                onPress={() => {
                  setModalEditar(false);
                  router.back();
                }}
              >
                <Text style={styles.textoConfirmar}>
                  Editar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  formulario: {
    paddingBottom: 30,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 10,
  },

  botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  seta: {
    fontSize: 25,
    color: "#222",
  },

  tituloCabecalho: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  label: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 4,
  },

  input: {
    height: 32,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    fontSize: 10,
    color: "#333",
  },

  botaoSalvar: {
    height: 38,
    marginHorizontal: 16,
    marginTop: 40,
    backgroundColor: "#2870e8",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  textoSalvar: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  caixaModal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
  },

  tituloModal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },

  mensagemModal: {
    fontSize: 10,
    color: "#777",
    marginTop: 12,
    lineHeight: 15,
  },

  botoesModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },

  botaoCancelar: {
    height: 32,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },

  textoCancelar: {
    color: "#777",
    fontSize: 10,
  },

  botaoConfirmar: {
    height: 32,
    paddingHorizontal: 12,
    backgroundColor: "#2870e8",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  textoConfirmar: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});