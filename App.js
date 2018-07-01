/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Button,
  TextInput,
} from 'react-native';

import { loadDatabse,getPetNames,populateDatabase, closeDatabase, errorCB, deleteDatabase, } from './sqlite'
// import db from './sqlite';
let db;
loadDatabse().then(x => db = x);

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      petname: "",
    };

    ToastAndroid.show('Hello!!', ToastAndroid.SHORT);
  }

  componentDidMount() {
    console.log("component mounted...");
    // deleteDatabase();
    // console.log("populateDatabase db", db);
    // deleteDatabase();
    getPetNames();
    populateDatabase();

  }

trydb = ()=>{
  db.executeSql('SELECT 1 FROM Version LIMIT 1').then(() => {
    console.log("Database is ready ... executing query ...");
    db.transaction(this.queryEmployees).then(() => {
      console.log("Processing completed")
      // closeDatabase(db);
    });
  });
}







  insertDataInToDb = () => {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO pet (owner, petname) VALUES (?,?)`,[this.state.owner,this.state.pet])
      .then(([tx,res])=>{
        console.log(tx,"data inserted sucessfully ",res, this.state.owner,this.state.pet);
        this.setState({owner:'',pet:''});
      }).catch(err=>console.log(err));
    });
  }
  gettDataFromDb = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM pet WHERE owner=?', [this.state.getData], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          // exists owner name John
          var row = results.rows.item(0);
          this.setState({ NewResult: row.petname });
        }
      },(err)=>console.log(err));
    });
    db.transaction((tx) => {
    tx.executeSql('SELECT * FROM pet', []).then(([tx,results]) => {
      console.log("Query completed",results)
      if(results){
        var len = results.rows.length;
        let rows = results.rows.raw();
  
        console.log("result from pets table:;; ",rows);
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          console.log(`Owner Name: ${row.owner}, Pet Name: ${row.petname}`)
        }

      }
    }
  ).catch((error) => {
    console.log(error);
  });
  });
}

  queryEmployees = (tx) => {
    // tx.executeSql('INSERT INTO pet (owner, petname) VALUES ("Kumar", "Cat3344");');
    // tx.executeSql('INSERT INTO pet (owner, petname) VALUES ("Raja", "Cat2233");');

    console.log("Retriving data from pet Table in sqlite");
    tx.executeSql('SELECT * FROM pet WHERE owner=?', ['Raja'], (tx, results) => {
      let rows = results.rows.raw(); // shallow copy of rows Array
      console.log("rowssss: ",rows)
      var len = results.rows.length;
      if (len > 0) {
        // exists owner name John
        var row = results.rows.item(0);
        this.setState({ petname: row.petname });
      }
    });


  }



  render() {
    return (
      <View style={styles.container}>
        <Text>SQLite Example</Text>
        <Text>{'Mary \'s pet is ' + this.state.petname}</Text>
        <View style={{backgroundColor:'#f2f2f2', width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Text>Insert Data</Text>
          <TextInput
          style={{height: 40,width:'80%', borderColor: 'gray', borderWidth: 1}}
          onChangeText={(owner) => this.setState({owner})}
          value={this.state.owner}
        />
        <TextInput
        style={{height: 40,width:'80%', borderColor: 'red', borderWidth: 1}}
        onChangeText={(pet) => this.setState({pet})}
        value={this.state.pet}
      />
          <Button
            onPress={this.insertDataInToDb}
            title="Insert Data"
            color="#841584"
            accessibilityLabel="Insert Data button"
          />
        </View>
        <View style={{backgroundColor:'#f2f2f2', width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Text>Get Data</Text>
          <Text>NewData: {this.state.NewResult}     </Text>

          <TextInput
        style={{height: 40,width:'80%', borderColor: 'blue', borderWidth: 1}}
        onChangeText={(getData) => this.setState({getData})}
        value={this.state.getData}
      />

          <Button
            onPress={this.gettDataFromDb}
            title="GetData"
            color="#841584"
            accessibilityLabel="GetData button"
          />
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});