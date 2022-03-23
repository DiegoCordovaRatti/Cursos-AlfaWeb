<template>
    <div>
        <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1" data-app>
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>My CRUD</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="70vw">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                Agregar curso
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-form ref="form" @submit.prevent="addCursos()" v-model="valid" lazy-validation>
                                        <v-text-field v-model="cursos.nombre" label="Nombre del curso" type="name"
                                            :counter="20" required></v-text-field>
                                        <v-text-field v-model="cursos.url" label="URL de imagen del curso" type="url" required>
                                        </v-text-field>
                                        <v-text-field v-model="cursos.cupos" label="Cupos del curso" type="number" required>
                                        </v-text-field>
                                        <v-text-field v-model="cursos.inscritos" label="Inscritos en el curso" type="number"
                                            required></v-text-field>
                                        <v-text-field v-model="cursos.duracion" label="Duración del curso" type="text"
                                            required>
                                        </v-text-field>
                                        <v-text-field v-model="cursos.costo" label="Costo del curso" type="number" required>
                                        </v-text-field>
                                        <v-text-field v-model="cursos.codigo" label="Código del curso" type="text" required>
                                        </v-text-field>
                                        <v-textarea v-model="cursos.descripcion" filled label="Descripción del curso" required
                                            auto-grow></v-textarea>

                                        <v-checkbox v-model="checkbox"
                                            :rules="[v => !!v || '¡Necesita validar su respuesta!']"
                                            label="Marque para validar" required></v-checkbox>
                                        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
                                            Agregar
                                        </v-btn>
                                        <v-btn color="error" class="mr-4" @click="reset">
                                            Limpiar formulario
                                        </v-btn>
                                    </v-form>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
        <div>
            <v-alert dense outlined type="purple">
                Cantidad total de alumnos permitidos: <strong>???</strong> alumnos
            </v-alert>
            <v-alert dense outlined type="light-blue">
                Cantidad total de alumnos inscritos: <strong>???</strong> alumnos
            </v-alert>
            <v-alert dense outlined type="red">
                Cantidad total de cupos restantes: <strong>???</strong> alumnos
            </v-alert>
            <v-alert dense outlined type="pink">
                Cantidad total de cursos terminados: <strong>???</strong> cursos
            </v-alert>
            <v-alert dense outlined type="brown">
                Cantidad total de cursos activos: <strong>???</strong> cursos
            </v-alert>
            <v-alert dense outlined type="orange">
                Cantidad total de cursos: <strong>???</strong> cursos
            </v-alert>
        </div>
    </div>
</template>

<script>
import { addDoc } from '@firebase/firestore'
import cursosCollection from '../firestore'
    export default {
        data: () => ({
            cursos:{
                nombre: null,
                url: null,
                cupos: null,
                inscritos: null,
                duracion: null,
                costo: null,
                codigo: null,
                descripcion: null,
                estado: false,
                fecha: "2022-01-01"
            },
            dialog: false,
            dialogDelete: false,
            headers: [{
                    text: 'Curso',
                    sortable: false,
                    value: 'nombre',
                },
                {
                    text: 'Cupos',
                    value: 'cupos'
                },
                {
                    text: 'Inscritos',
                    value: 'inscritos'
                },
                {
                    text: 'Duración',
                    value: 'duracion'
                },
                {
                    text: 'Costo',
                    value: 'costo'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
        }),

        watch: {
            dialog(val) {
                val || this.close()
            },
            dialogDelete(val) {
                val || this.closeDelete()
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                this.desserts = [{
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                    },
                ]
            },

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm() {
                this.desserts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete() {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            async addCursos(){
                await addDoc(cursosCollection, this.cursos)
                alert('El curso a sido agregado')
                this.$router.push("/")
            },
        },
    }
</script>