import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/store";

export default function Configuracoes() {
  const [modalSair, setModalSair] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector((state: any) => state.usuario.email);

  const sairDaConta = () => {
    dispatch(logout());
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
     

<View style={styles.perfil}>
  <Image
  source={require("../assets/images/avatar-marina.jpg")}
  style={styles.avatar}
/>
</View>

<View style={styles.dadosPerfil}>
  <Text style={styles.nome}>Marina Costa</Text>
 <Text style={styles.email}>marina.costa@gmail.com</Text> 
</View>

      {/* Opções */}
      <View style={styles.opcoes}>
        <TouchableOpacity style={styles.opcao}>
        <Ionicons
  name="person"
  size={18}
  color="#777"
   style={styles.icone}
  
/>  
          <Text style={styles.textoOpcao}>Meus dados</Text>  
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao}>
         <Ionicons
  name="notifications"
  size={18}
  color="#777"
  style={styles.icone}
  
/> 
          <Text style={styles.textoOpcao}>Notificações</Text>  
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcao}>
         <Ionicons
  name="document-text"
  size={18}
  color="#777"
  style={styles.icone}
  
/> 
          <Text style={styles.textoOpcao}>Termos de uso</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Sair */}
      <TouchableOpacity
        style={styles.botaoSair}
       onPress={() => setModalSair(true)} 
      >
        <Text style={styles.textoSair}>Sair da conta</Text>
      </TouchableOpacity>
      <Modal
  visible={modalSair}
  transparent={true}
  animationType="fade"
  onRequestClose={() => setModalSair(false)}
>
  <View style={styles.fundoModal}>
    <View style={styles.caixaModal}>
      <Text style={styles.tituloModal}>Sair da conta</Text>

      <Text style={styles.mensagemModal}>
        Você tem certeza que deseja sair da conta?
      </Text>

      <View style={styles.botoesModal}>
        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={() => setModalSair(false)}
        >
          <Text style={styles.textoCancelar}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoConfirmar}
          onPress={sairDaConta}
        >
          <Text style={styles.textoConfirmar}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
          <View style={styles.menuInferior}>
            
        <TouchableOpacity
  style={styles.menuItem}
  onPress={() => router.replace("/produtos")}
>
 <Ionicons
  name="home"
  size={16}
  color="#777"
  
/> 
  <Text style={styles.menuTexto}>Início</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.menuItem}
  onPress={() => router.replace("/configuracoes")}
>
 <Ionicons
  name="settings-outline"
  size={16}
  color="#2870e8"
  
  
/> 
  <Text style={styles.menuTextoAtivo}>Configurações</Text>
</TouchableOpacity>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  cabecalho: {
    height: 55,
    backgroundColor: "#2870e8",
    justifyContent: "center",
  },

  botaoVoltar: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  seta: {
    color: "#fff",
    fontSize: 28,
  },

  perfil: {
  backgroundColor: "#2870e8",
  height: 135,
  alignItems: "center",
  position: "relative",
  zIndex: 2,
},

avatar: {
  width: 80,
  height: 80,
  borderRadius: 40,
  overflow: "hidden",
  position: "absolute",
  bottom: -40,
  zIndex: 2,
},

avatarTexto: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#2870e8",
},

nome: {
  color: "#222",
  fontSize: 18,
  fontWeight: "bold",
},

email: {
  color: "#777",
  fontSize: 12,
  textAlign: "center",
  marginTop: 2,
  marginBottom: 12,
},

dadosPerfil: {
  width: "100%",
  alignItems: "center",
  backgroundColor: "#fff",
  paddingTop: 48,
  paddingBottom: 5,
  zIndex: 1,
},
  opcoes: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },

 opcao: {
  height: 40,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 5,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 8,
},

  icone: {
    width: 35,
    fontSize: 18,
  },

  textoOpcao: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  chevron: {
    fontSize: 25,
    color: "#777",
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

  menuTextoAtivo: {
    fontSize: 9,
    color: "#2870e8",
    fontWeight: "bold",
    marginTop: 4,
  },

  menuTexto: {
    fontSize: 9,
    color: "#777",
    marginTop: 4,
  },

 botaoSair: {
  marginHorizontal: 15,
  marginTop: 20,
  height: 42,
  backgroundColor: "#ef3030",
  borderRadius: 3,
  justifyContent: "center",
  alignItems: "center",
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