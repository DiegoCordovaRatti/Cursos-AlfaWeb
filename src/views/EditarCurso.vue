<template>
    <div>
        <h1>Editando el curso : ???</h1>
        <v-form @submit.prevent="updateCurso(item)" ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="nombre" label="Nombre del curso" type="name" :counter="20" required></v-text-field>
            <v-text-field v-model="url" label="URL de imagen del curso" type="url" required></v-text-field>
            <v-text-field v-model="cupos" label="Cupos del curso" type="number" required></v-text-field>
            <v-text-field v-model="inscritos" label="Inscritos en el curso" type="number" required></v-text-field>
            <v-text-field v-model="duracion" label="Duración del curso" type="text" required></v-text-field>
            <v-text-field v-model="costo" label="Costo del curso" type="number" required></v-text-field>
            <v-text-field v-model="codigo" label="Código del curso" type="text" required></v-text-field>
            <v-textarea v-model="descripcion" filled label="Descripción del curso" required auto-grow></v-textarea>
            <v-text-field v-model="registro" label="Fecha de registro" type="date" required></v-text-field>
            
            <v-container class="px-0" fluid>
                <v-switch v-model="switch1" :label="`¿Completado? :`"></v-switch>
            </v-container>
            <v-checkbox v-model="checkbox" :rules="[v => !!v || '¡Necesita validar su respuesta!']"
                label="Marque para validar" required></v-checkbox>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="Actualizar">
                Actualizar
            </v-btn>
            <v-btn color="error" class="mr-4" @click="reset">
                Limpiar formulario
            </v-btn>
            <v-btn color="primary" @click="resetValidation">
                Regresar
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        data: () => ({
            valid: true,
            nombre: null,
            url: null,
            cupos: null,
            inscritos: null,
            duracion: null,
            costo: null,
            codigo: null,
            descripcion: null,
            registro: null,
            switch1: false,
            checkbox: false,
        }),
        methods: {
            Actualizar() {
                this.$refs.form.validate()
            },
            reset() {
                this.$refs.form.reset()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
        },
    }
</script>