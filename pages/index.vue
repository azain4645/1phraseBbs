<template>
  <section class="container mx-auto mb-5">
    <div>
      <h2>
        一言掲示板
      </h2>
      <div>
        <v-btn @click="writeToFirestore">
          <span>Write now</span>
        </v-btn>
        <v-btn @click="readFromFirestore">
          <span>Read now</span>
        </v-btn>
      </div>
    </div>
  </section>

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

    <v-list-item lines="two" v-for="phrase in phrases" :key="phrase">
      <v-list-item-header>
        <v-list-item-title>{{ phrase.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ phrase.created_date }}</v-list-item-subtitle>
      </v-list-item-header>
    </v-list-item>
    
  </v-card>

</template>

<script setup lang="ts">
// import { db } from "~/plugins/firebase.js"
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import NoWorkResult from 'postcss/lib/no-work-result';

const firebaseConfig  = { 
  apiKey: "AIzaSyDskyUlYX_3PO7ZBwTXjoTiO9aVceS1wOQ",
  authDomain: "phrasebbs.firebaseapp.com",
  projectId: "phrasebbs",
  storageBucket: "phrasebbs.appspot.com",
  messagingSenderId: "501839072363",
  appId: "1:501839072363:web:5889fa3860da58fd8ff52e"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

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
          + ':' + ('00' + d.getMinutes()).slice(-2);
}

const writeToFirestore = async () => {
  const ref = doc(db, "phrases", "text2")
  const d = new Date();
  const document = {
    text: "テスト",
    created_date: formatedNow(),
  };
  try {
      await setDoc(ref, document)
      alert("Success!")
  } catch (e) {
    alert("Error!")
    console.error(e)
  }
}

const readFromFirestore = async () => {
  const ref = doc(db, "phrases", "text2")
  try {
    const document = await getDoc(ref)
    phrases.value.push = document.data()

    // phrases.value.push = [{text: 'test2', created_date: '2002'}]
  } catch (e) {
    alert("Error!")
    console.error(e)
  }
}

const phrases = ref<Phrase[]>([
  {text: '書き込み１', created_date: '2022-07-20 12:08'}
])

</script>
