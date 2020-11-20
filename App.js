import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// or any pure javascript modules available in npm
import { TextInput, Button } from 'react-native-paper';

export default class App extends React.Component {
 // valores globais do app
  state = {
    peso: 0,
    altura: 0,
    imc: 0,
    legenda: 'Indeterminado',
    cor: '#bdc3c7',
  };
 
  calcularIMC = () => {
    const resultado = 
    this.state.peso / (this.state.altura * this.state.altura );

    this.setState({
      imc: Math.ceil(resultado)
    });
// criando a tabela de resultados
    if(resultado < 18.5) {
      this.setState({
        legenda: 'Magreza',
        cor: '#ff3838'
      });
    } else if(resultado >= 18.5 && resultado < 25) {
      this.setState( {
        legenda: 'Normal',
        cor: '#3ae374'
      });   
    } else if(resultado >= 25 && resultado < 30) {
      this.setState({
        legenda: 'Sobrepeso',
        cor: '#fff200'
      });
    } else if(resultado >= 30 && resultado < 40) {
      this.setState({
        legenda: 'Obesidade',
        cor: '#ffaf40'
      });
    } else if(resultado >= 40) {
      this.setState({
        legenda: 'Obesidade Grave',
        cor: '#ff3838'
      });
    }
  }

  render() {
  return (
    <View style={styles.app}>
      <Text style={styles.legenda}>Seu IMC</Text>
 
      <View style={[styles.painel, {backgroundColor: this.state.cor}]}> 
        <Text style={styles.resultado}>{this.state.imc}</Text>
        <Text style={styles.diagnostico}>{this.state.legenda}</Text>
      </View>

      <View>
        <TextInput 
          style={styles.peso} 
          label="Peso"
          onChangeText={valor => {
           this.setState({peso: valor.replace(',', '.')});
    // replace altera o que recebe pelo que eu quero que converta
    // no caso trocarei , por . / peso.replace(',', '.')
        }}  
        />
        <TextInput 
          style={styles.altura} 
          label="Altura"
          onChangeText={(valor) => {
            this.setState({altura: valor.replace(',', '.')});
          } } 
        />
        <Button style={styles.calcular}
        mode='contained'
        onPress={this.calcularIMC}>
        Calcular
        </Button>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  app: {
    padding: 10,
  },
  painel:{
    
    alignSelf: 'center',
    borderRadius: 5,
    width: 150,
    marginVertical: 10,
    padding: 8,
  },

  legenda: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  resultado: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },

  diagnostico: {
    textAlign: 'center',
    fontSize: 16,
  },

  peso: {
    marginVertical: 10,
    width: '80%',
    alignSelf: "center"
  },

  altura: {
    marginVertical: 10,
    width: '80%',
    alignSelf: "center"
  },

  calcular: {
    backgroundColor: '#67e6dc',
    fontWeight: 'bold',
    width: '80%',
    alignSelf: "center"
  }
});
