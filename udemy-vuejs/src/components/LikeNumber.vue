<template>
    <p>いいね({{ num }})</p>
  </template>
  
  <script>
  export default {
    props: ["num"],
    data () {
      return {
        number: 5
      }
    }
  }
  </script>
  
  <!--styleタグはなくてもいい-->