// Importando os componentes necessários do React e do React Native
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios"; // Importando o Axios para fazer requisições HTTP

// Definindo o componente principal do aplicativo
const App = () => {
  // Definindo estados para armazenar o CEP digitado e o endereço retornado pela API
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  // Função assíncrona para buscar o endereço com base no CEP digitado
  const fetchAddress = async () => {
    try {
      // Fazendo uma requisição GET para a API ViaCEP usando o Axios
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      // Atualizando o estado do endereço com os dados retornados pela API
      setAddress(response.data);
    } catch (error) {
      // Capturando qualquer erro ocorrido durante a requisição
      console.error("Error fetching address:", error);
      // Caso ocorra um erro, limpando o endereço para evitar informações inválidas
      setAddress(null);
    }
  };

  // Renderizando a interface do aplicativo
  return (
    <View style={styles.container}>
      {/* Componente de entrada de texto para o usuário digitar o CEP */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
        />
        {/* Botão para iniciar a busca do endereço */}
        <Button title="Buscar Endereço" onPress={fetchAddress} />
      </View>
      {/* Exibindo o resultado da busca do endereço */}
      <View style={styles.resultContainer}>
        {address && (
          <View>
            <Text>CEP: {address.cep}</Text>
            <Text>Rua: {address.logradouro}</Text>
            <Text>Bairro: {address.bairro}</Text>
            <Text>Cidade: {address.localidade}</Text>
            <Text>Estado: {address.uf}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default App;

// Estilos CSS para os componentes do aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    backgroundColor: "black",
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "40%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    width: "40%",
    height: "30%",
    backgroundColor: "#fff",
  },
});
