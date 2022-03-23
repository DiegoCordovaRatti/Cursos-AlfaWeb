<template>
    <div>
        <p v-for="(curso, i) in $store.state.cursosDB" :key="i">{{curso}}</p>
    </div>
</template>