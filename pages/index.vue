<template>
  <v-container fluid>
    <v-row>
      <h2 class="mb-3 mx-auto">
        一言掲示板
      </h2>
    </v-row>

    <v-form class="">
      <v-row>
        <v-col cols="8">
          <v-text-field 
            type="text" 
            v-model="message"
            label="何か書き込んでみてください"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn @click="writeToFirestore">
            <span>書き込む</span>
          </v-btn>
        </v-col>
      </v-row>    
    </v-form>

    <v-btn @click="readFromFirestore">
      <span>Read now</span>
    </v-btn>

  </v-container>

  <v-card
    class="mx-auto"
    width="600"
    tile
  >
    <v-list-item lines="two">
      <v-list-item-header>
        <v-list-item-title>書き込み内容</v-list-item-title>
        <v-list-item-subtitle>投稿日</v-list-item-subtitle>
      </v-list-item-header>
    </v-list-item>

    <v-list-item lines="two" v-for="phrase in phrases" :key="phrase.text">
      <v-list-item-header>
        <v-list-item-title>{{ phrase.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ phrase.created_date }}</v-list-item-subtitle>
      </v-list-item-header>
    </v-list-item>
    
  </v-card>

</template>

<script setup lang="ts">
import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore'
// import { initializeApp } from "firebase/app"
// const firebaseConfig  = { 
//   apiKey: "AIzaSyDskyUlYX_3PO7ZBwTXjoTiO9aVceS1wOQ",
//   authDomain: "phrasebbs.firebaseapp.com",
//   projectId: "phrasebbs",
//   storageBucket: "phrasebbs.appspot.com",
//   messagingSenderId: "501839072363",
//   appId: "1:501839072363:web:5889fa3860da58fd8ff52e"
// }

// const app = initializeApp(firebaseConfig);

import { getFirestore } from 'firebase/firestore'

// ここでthisがundifinedになる
const db = getFirestore(this.$firebase)

type Phrase = {
  text: string;
  created_date: string;
}

const formatedNow = () : string => {
  const d = new Date()
  return d.getFullYear()
          + '-' + ('00' + (d.getMonth() + 1)).slice(-2)
          + '-' + ('00' + d.getDate()).slice(-2)
          + ' ' + ('00' + d.getHours()).slice(-2)
          + ':' + ('00' + d.getMinutes()).slice(-2)
          + ':' + ('00' + d.getSeconds()).slice(-2);
}

const writeToFirestore = async () => {
  if(!message.value){ return }

  const document = {
    text: message.value,
    created_date: formatedNow(),
  }
  try {
      await addDoc(collection(db, "phrases"), document)
      // alert("Success!")
      message.value = ''
      readFromFirestore()
  } catch (e) {
    alert("Error!")
    console.error(e)
  }
}

const readFromFirestore = async () => {
  try {
    const q = query(collection(db, "phrases"), orderBy('created_date', 'desc'));

    const querySnapshot = await getDocs(q);
    const Docs = <Phrase[]>([])

    querySnapshot.forEach((doc) => {
      const addDoc = <Phrase>{
        text : doc.data().text,
        created_date: doc.data().created_date
      }
      Docs.push(addDoc)
    });

    phrases.value = Docs
  } catch (e) {
    alert("Error!")
    console.error(e)
  }
}

const phrases = ref<Phrase[]>([])
const message = ref('')
</script>
