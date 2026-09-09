import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
};

export default function Detalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalExcluir, setModalExcluir] = useState(false);

  useEffect(() => {
    async function buscarProduto() {
      try {
        setCarregando(true);

        const resposta = await axios.get(
          `https://dummyjson.com/products/${id}`
        );

        setProduto(resposta.data);
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

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Carregando produto...</Text>
      </View>
    );
  }

  if (!produto) {
    return (
      <View style={styles.loading}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  const precoAtual = produto.price * 5.5;

  const precoAnterior =
    precoAtual / (1 - produto.discountPercentage / 100);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: produto.thumbnail }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{produto.title}</Text>

        <View style={styles.precoContainer}>
          <Text style={styles.price}>
            R$ {precoAtual.toFixed(2).replace(".", ",")}
          </Text>

          <Text style={styles.oldPrice}>
            R$ {precoAnterior.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        <Text style={styles.description}>
          {produto.description}
        </Text>

        <Modal
          visible={modalExcluir}
          transparent
          animationType="fade"
          onRequestClose={() => setModalExcluir(false)}
        >
          <View style={styles.fundoModal}>
            <View style={styles.caixaModal}>
              <Text style={styles.tituloModal}>
                Excluir produto
              </Text>

              <Text style={styles.mensagemModal}>
                Você tem certeza que deseja excluir esse produto? Essa ação não poderá ser desfeita.
              </Text>

              <View style={styles.botoesModal}>
                <TouchableOpacity
                  style={styles.botaoCancelar}
                  onPress={() => setModalExcluir(false)}
                >
                  <Text style={styles.textoCancelar}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoConfirmar}
                  onPress={() => {
                    setModalExcluir(false);
                    router.back();
                  }}
                >
                  <Text style={styles.textoConfirmar}>
                    Excluir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  backButton: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },

  backText: {
    fontSize: 28,
    color: "#222",
  },

  image: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    backgroundColor: "#f8f8f8",
  },

  info: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },

  precoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e53935",
    marginRight: 8,
  },

  oldPrice: {
    fontSize: 14,
    color: "#777",
    textDecorationLine: "line-through",
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
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
    borderRadius: 6,
    padding: 18,
  },

  tituloModal: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },

  mensagemModal: {
    fontSize: 11,
    color: "#777",
    marginTop: 12,
    lineHeight: 16,
  },

  botoesModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },

  botaoCancelar: {
    height: 32,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },

  textoCancelar: {
    color: "#777",
    fontSize: 11,
  },

  botaoConfirmar: {
    height: 32,
    paddingHorizontal: 14,
    backgroundColor: "#ef3030",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  textoConfirmar: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
});