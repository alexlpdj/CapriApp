import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    StatusBar
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Text,
    StyleProvider,
    Form,
    Item,
    Input,
    Icon,
    Left,
    Right,
    Body,
    Button,
    Title,
    Card,
    Thumbnail,
    CardItem
} from 'native-base';


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignContent: 'center',

        flexDirection: 'column',
        justifyContent: 'space-between',
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })

    }
});

export default class AuthScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            authType: 'login',
        };
    }

    static navigationOptions = {
        header: null
    };

    handleLogin() {

        fetch('localhost:8000/api/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }),
        });

    }

    renderFormContent() {

        switch (this.state.authType) {
            case 'login':
                return (
                    <Card transparent style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                        <CardItem>
                            <Thumbnail large
                                       source={{uri: 'http://www.colegioexpressao.com/assets/images/avatar-2.png'}}/>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    onChangeText={(text) => this.setState({user: text})}
                                    placeholderTextColor="#66bb6a"
                                    placeholder="Usuario o Teléfono"
                                    style={{textAlign: 'center'}}
                                />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({password: text})}
                                    placeholderTextColor="#66bb6a"
                                    placeholder="Contraseña"
                                    style={{textAlign: 'center'}}
                                />
                            </Item>
                        </CardItem>
                        <Button style={{margin: 15}} block rounded
                                onPress={this.handleLogin}><Text>Acceder</Text></Button>
                        <Text style={{textAlign: 'center'}}>Si aun no tienes una cuenta
                            <Text
                                style={{color: 'blue', fontStyle: 'italic'}}
                                onPress={() => this.setState({authType: 'register'})}
                            >
                                , registrate aquí.
                            </Text>
                        </Text>
                    </Card>
                );

            case 'register':
                return (
                    <Card transparent style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                        <CardItem>
                            <Thumbnail large
                                       source={{uri: 'http://www.colegioexpressao.com/assets/images/avatar-2.png'}}/>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    onChangeText={(text) => this.setState({registerUser: text})}
                                    placeholderTextColor="#66bb6a"
                                    placeholder="Usuario"
                                    style={{textAlign: 'center'}}
                                />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({registerPassword: text})}
                                    placeholderTextColor="#66bb6a"
                                    placeholder="Contraseña"
                                    style={{textAlign: 'center'}}
                                />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    onChangeText={(text) => this.setState({registerPhone: text})}
                                    placeholderTextColor="#66bb6a"
                                    placeholder="Teléfono"
                                    style={{textAlign: 'center'}}
                                />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    onChangeText={(text) => this.setState({registerAddress: text})}
                                    placeholderTextColor="#66bb6a"
                                    placeholder="Dirección"
                                    style={{textAlign: 'center'}}
                                />
                            </Item>
                        </CardItem>
                        <Button style={{margin: 15}} block rounded
                                onPress={this.handleRegister}><Text>Registrarme</Text></Button>
                        <Text style={{textAlign: 'center'}}>Si ya tienes una cuenta
                            <Text style={{color: 'blue', fontStyle: 'italic'}}
                                  onPress={() => this.setState({authType: 'login'})}
                            >
                                , accede aquí.
                            </Text>
                        </Text>

                    </Card>
                );
        }
    }


    render() {

        //console.log('Estado: ' + this.state.user);
        return (

            <Container style={styles.container}>
                <Header>
                    <Body>
                    <Title>Capri</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>

                    {this.renderFormContent()}

                </Content>
            </Container>

        )
    }
}