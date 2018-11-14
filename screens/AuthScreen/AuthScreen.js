import React from 'react';
import {StyleSheet} from 'react-native';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Input,
    Item,
    Right,
    Text,
    Thumbnail,
    Title,
    Toast,
} from 'native-base';
import {connect} from "react-redux";
import {updateAuthData} from "../../redux/actions";


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignContent: 'center',

        flexDirection: 'column',
        justifyContent: 'space-between',


    }
});

class AuthScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            registerEmail: '',
            registerPassword: '',
            registerPhone: '',
            registerAddress: '',
            authType: 'login',
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    handleLogin() {

        fetch('http://192.168.0.13:8000/api/customers/existCustomer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then((responseJSON) => {
            return responseJSON.text();
        }).then((responseString) => {

            let response = JSON.parse(responseString);

            if (response.exist) {

                Toast.show({
                    text: "Bienvenido, nos alegramos de verte!",
                    buttonText: "Ok",
                    type: "success",
                    duration: 10000
                });

                this.props.dispatch(updateAuthData(response.authData));
                this.props.navigation.navigate('Home');

            } else {
                Toast.show({
                    text: "Tus datos no son correctos, revisalos y vuelve a intentarlo",
                    buttonText: "Ok",
                    type: "danger",
                    duration: 4000
                })
            }

        }).catch((error) => {
            console.error(error);

            Toast.show({
                text: "Oops ha ocurrido algo inesperado, vuelve a intentarlo más tarde",
                buttonText: "Ok",
                type: "danger",
                duration: 4000

            })
        });

    }

    handleRegister() {

        fetch('http://192.168.0.13:8000/api/customers/insertNewCustomer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                phone: this.state.registerPhone,
                address: this.state.registerAddress,
            }),
        }).then((responseJSON) => {
            return responseJSON.text();
        }).then((responseString) => {

            let response = JSON.parse(responseString);

            if (response.inserted) {
                Toast.show({
                    text: "Registrado con exito! Ahora utiliza tus datos para acceder",
                    type: 'success',
                    duration: 4000

                });

                this.setState({
                    email: this.state.registerEmail,
                    password: this.state.registerPassword,
                    authType: 'login'
                })

            } else {

                console.error('Error: ' + response.error);
                Toast.show({
                    text: "Error en el registro, por favor revisa tus datos y vuelve a intentarlo",
                    type: 'danger',
                    duration: 4000
                })

            }

        }).catch((error) => {
            console.error(error);

            Toast.show({
                text: "Error en el registro, por favor revisa tus datos y vuelve a intentarlo",
                buttonText: "Ok",
                type: "danger",
                duration: 4000
            })
        });

    }

    renderFormContent() {

        switch (this.state.authType) {
            case 'login':

                let loginFormValid = (this.state.email.length > 0 && this.state.password.length > 0);

                return (
                    <Card transparent style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                        <CardItem>
                            <Thumbnail large
                                       source={{uri: 'http://www.colegioexpressao.com/assets/images/avatar-2.png'}}/>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    onChangeText={(text) => this.setState({email: text})}
                                    value={this.state.email}
                                    placeholderTextColor="#66bb6a"
                                    placeholder="Email o Teléfono"
                                    style={{textAlign: 'center'}}
                                />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({password: text})}
                                    value={this.state.password}
                                    placeholderTextColor="#66bb6a"
                                    placeholder="Contraseña"
                                    style={{textAlign: 'center'}}
                                />
                            </Item>
                        </CardItem>
                        <Button style={{margin: 15}}
                                block rounded
                                onPress={this.handleLogin}
                                disabled={!loginFormValid}
                        >
                            <Text>Acceder</Text>
                        </Button>
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

                let registerFormValid = (this.state.registerEmail.length > 0 && this.state.registerPassword.length > 0 && this.state.registerPhone.length > 0 && this.state.registerAddress.length > 0);

                return (
                    <Card transparent style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                        <CardItem>
                            <Thumbnail large
                                       source={{uri: 'http://www.colegioexpressao.com/assets/images/avatar-2.png'}}/>
                        </CardItem>
                        <CardItem>
                            <Item style={{margin: 5}} rounded>
                                <Input
                                    onChangeText={(text) => this.setState({registerEmail: text})}
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
                        <Button style={{margin: 15}}
                                block rounded
                                onPress={this.handleRegister}
                                disabled={!registerFormValid}
                        >
                            <Text>Registrarme</Text>
                        </Button>

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

const mapStateToProps = (state) => {

    return state;
};


export default connect(mapStateToProps)(AuthScreen);