import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Permite rotear o usuario pelas Views
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png'
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation(); // equivale ao useHistory

    function navigateToDetail() {
        navigation.navigate('Detail');
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos</Text>.
                </Text>
            </View>
            {/* Mensagem Bem-Vindo */}
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            {/* Lista de casos 
                Utilização do FlatList para habilitar o scroll            
            */}
            <FlatList data={[1, 2, 3, 4]} 
                keyExtractor={ incident => String(incident)}
                style={styles.incidentList}
                showsVerticalScrollIndicator= {false}
                renderItem={ () => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>APAD</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>Casa incendiada</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>R$ 120,00</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={ navigateToDetail }>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
            )}/>
        </View>
    ); 
}