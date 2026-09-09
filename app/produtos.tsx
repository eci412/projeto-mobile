import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
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
import { useDispatch } from "react-redux";
import { logout } from "../store/store";

type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
};

const categoriasMasculinas = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
];

const categoriasFemininas = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

export default function Produtos() {
  const [genero, setGenero] = useState<"masculino" | "feminino">(
    "masculino"
  );

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(false);

  const [modalSair, setModalSair] = useState(false);

  const dispatch = useDispatch();

  const sairDaConta = () => {
    dispatch(logout());
    router.replace("/");
  };

  useEffect(() => {
    async function buscarProdutos() {
      try {
        setCarregando(true);

        const categorias =
          genero === "masculino"
            ? categoriasMasculinas
            : categoriasFemininas;

        const respostas = await Promise.all(
          categorias.map((categoria) =>
            axios.get(
              `https://dummyjson.com/products/category/${categoria}`
            )
          )
        );

        const todosOsProdutos = respostas.flatMap(
          (resposta) => resposta.data.products
        );

        setProdutos(todosOsProdutos);
      } catch (erro) {
        console.log("Erro ao buscar produtos:", erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarProdutos();
  }, [genero]);

  return (
    <View style={styles.areaExterna}>
      {/* TELA DO APLICATIVO */}
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              genero === "masculino" && styles.tabAtiva,
            ]}
            onPress={() => setGenero("masculino")}
          >
            <Text style={styles.tabText}>
              Produtos Masculinos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              genero === "feminino" && styles.tabAtiva,
            ]}
            onPress={() => setGenero("feminino")}
          >
            <Text style={styles.tabText}>
              Produtos Femininos
            </Text>
          </TouchableOpacity>
        </View>

        {carregando ? (
          <ActivityIndicator
            size="large"
            style={styles.loading}
          />
        ) : (
          <ScrollView
  style={styles.scrollView}
  contentContainerStyle={styles.lista}
  showsVerticalScrollIndicator={false}
>
            {produtos.map((produto) => (
              <TouchableOpacity
                key={produto.id}
                style={styles.card}
                onPress={() =>
                  router.push(`/detalhes?id=${produto.id}`)
                }
              >
              <View style={styles.areaImagem}>
  <Image
    source={{ uri: produto.thumbnail }}
    style={styles.image}
  />
</View>

                <Text
                  style={styles.productTitle}
                  numberOfLines={1}
                >
                  {produto.title}
                </Text>

                <Text
                  style={styles.description}
                  numberOfLines={3}
                >
                  {produto.description}
                </Text>

                <View style={styles.precoContainer}>
                  <Text style={styles.price}>
                    R$ {(produto.price * 5.5).toFixed(2)}
                  </Text>

                  {produto.discountPercentage > 0 && (
                    <Text style={styles.oldPrice}>
                      R${" "}
                      {(
                        (produto.price * 5.5) /
                        (1 -
                          produto.discountPercentage / 100)
                      ).toFixed(2)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* BOTÃO + */}
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => router.push("/adicionar-produto")}
        >
          <Text style={styles.botaoAdicionarTexto}>+</Text>
        </TouchableOpacity>

       <View style={styles.menuInferior}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons
             name="home" 
              size={16}
              color="#2870e8"
            />
            <Text style={styles.menuTextoAtivo}>
              Início
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              console.log("CLICOU CONFIGURAÇÕES");
              router.replace("/configuracoes");
            }}
          >
         <Ionicons
    name="settings-outline"
    size={16}
    color="#777"
  />
  <Text style={styles.menuTexto}>
    Configurações
  </Text>
</TouchableOpacity>   
        </View>

        
        <Modal
          visible={modalSair}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalSair(false)}
        >
          <View style={styles.fundoModal}>
            <View style={styles.caixaModal}>
              <Text style={styles.tituloModal}>
                Sair da conta
              </Text>

              <Text style={styles.mensagemModal}>
                Você tem certeza que deseja sair da conta?
              </Text>

              <View style={styles.botoesModal}>
                <TouchableOpacity
                  style={styles.botaoCancelar}
                  onPress={() => setModalSair(false)}
                >
                  <Text style={styles.textoCancelar}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoConfirmar}
                  onPress={sairDaConta}
                >
                  <Text style={styles.textoConfirmar}>
                    Sair
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      
      <TouchableOpacity
        style={styles.botaoSair}
        onPress={() => setModalSair(true)}
      >
        <Text style={styles.textoSair}>
          Sair da conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
areaExterna: {
  flex: 1,
  backgroundColor: "#d9d9d9",
  alignItems: "center",
  overflow: "hidden",
}, 
  
 container: {
  width: "100%",
  height: 530,
  backgroundColor: "#fff",
  position: "relative",
  overflow: "hidden",
  flexShrink: 0,
},

  tabs: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  tabAtiva: {
    borderBottomColor: "#2870e8",
  },

  tabText: {
    fontSize: 11,
    fontWeight: "bold",
  },

 scrollView: {
  flex: 1,
  minHeight: 0,
   marginBottom: 80,
},

  lista: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    paddingBottom: 0,
    gap: 8,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 6,
  },

  areaImagem: {
  borderBottomWidth: 1,
  borderBottomColor: "#ccc",
  marginBottom: 5,
},

  image: {
    width: "100%",
    height: 105,
    resizeMode: "contain",
    marginBottom: 5,
  },

  productTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },

  description: {
    fontSize: 9,
    color: "#666",
    lineHeight: 12,
    marginBottom: 6,
  },

  precoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  price: {
    fontSize: 12,
    fontWeight: "bold",
  },

  oldPrice: {
    fontSize: 9,
    color: "#777",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },

  loading: {
    marginTop: 40,
  },

  
  botaoAdicionar: {
    position: "absolute",
    right: 18,
    bottom: 70,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2870e8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  botaoAdicionarTexto: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 42,
    textAlign: "center",
  },

  menuInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 58,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  menuItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  menuIcone: {
    fontSize: 18,
    color: "#777",
    marginBottom: 2,
  },

  menuIconeAtivo: {
  fontSize: 18,
  color: "#2870e8",
  marginBottom: 2,
},

  menuTextoAtivo: {
    fontSize: 9,
    color: "#2870e8",
    fontWeight: "bold",
  },

  menuTexto: {
    fontSize: 9,
    color: "#777",
  },

  
  botaoSair: {
    width: "90%",
    maxWidth: 335,
    height: 42,
    backgroundColor: "#ef3030",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
   marginBottom: 20, 
  },

  textoSair: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
    borderRadius: 10,
    padding: 20,
  },

  tituloModal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },

  mensagemModal: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 12,
  },

  botoesModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  botaoCancelar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#2870e8",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },

  textoCancelar: {
    color: "#2870e8",
    fontSize: 14,
    fontWeight: "bold",
  },

  botaoConfirmar: {
    flex: 1,
    height: 40,
    backgroundColor: "#ef3030",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },

  textoConfirmar: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});