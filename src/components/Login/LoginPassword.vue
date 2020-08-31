<template>
  <v-container>
    <h1>loginpassword</h1>
    <v-text-field
      label="ID"
      filled
    ></v-text-field>

    <v-text-field
      label="PASSWORD"
      filled
    ></v-text-field>

    <v-row
      align="center"
      justify="center"
    >
      <v-btn>
        <router-link to="mypage">LOGIN</router-link>
      </v-btn>
    </v-row>

  </v-container>
</template>
