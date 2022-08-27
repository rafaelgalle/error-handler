# **Error handler**
Searching for a good way to handle errors with nodejs + typescript

## **Manipulando erros**

Objetivo deste repositório é encontrar uma maneira elegante e funcional de tratar erros em aplicações, afinal, devo estourar uma exceção, lançar um erro mapeado, retornar null???

Após ler muito sobre esse assunto, encontrei dois principais caminhos
* Utilizar exceções e lança-las código a dentro
* Evitar exceções, criando erros mapeados e utilizá-los.

Entendi que não existe um jeito certo ou errado, são filosofias diferentes cada uma com seus prós e contras, eu separei uma série de links de artigos e vídeos dos quais reuni ideias, eles estão no final destas instruções.

Apesar de acreditar não existir um jeito certo ou errado, gosto mais de evitar exceções, mapear erros, identificar erros negociais e classificá-los, identificando erros a nível de aplicação e a nível de negócio, do domínio da aplicação.

Dessa maneira, validações que são realizadas no domínio da aplicação, validações de regras de negócio jamais retornarão exceções, mas sempre erros mapeados e bem definidos, deixando exceções para erros não esperados, geralmente comunicações com terceiros que ficam na camada de infraestrutura, onde são realmente exceções, coisas que fogem do domínio de nossa aplicação.

Fiz um exemplo tosco, apenas para validar o conceito que mais me agradou,  ele é praticamente todo baseado em uma classe de **Result<T>**, onde passamos a tipo do nosso objeto, uma vez que instanciamos a classe com esse tipo, podemos esperar um retorno **ok** com seus dados, ou um retorno **fail** com um erro mapeado, como por exemplo
```
const userOrError = await this.userRepository.create(user)
if (userOrError.isFailure) return Result.fail<UserEntity>(userOrError.error)

return Result.ok<UserEntity>(userOrError.getValue())
```

Ao chamar o dado do repositório eu não espero um objeto do tipo **User**, mas sim um objeto de **Result<User>**, podende conter um **User** ou um **Erro**, assim sempre podemos esperar um retorno padronizado do nosso domínio, sempre utilizando a classe Result, se houver erro ao cadastrar usuário ou se o usuário buscado não existir vou utilizar um erro mapeado e retornalo através da classe Result, mantendo um padrão e não utilizando estouro de exceções para esses cenários, nem mesmo retornando ora Usuário ora Null.
### **Referências**

https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/

https://khalilstemmler.com/articles/enterprise-typescript-nodejs/functional-error-handling/

https://medium.com/inato/expressive-error-handling-in-typescript-and-benefits-for-domain-driven-design-70726e061c86

https://www.youtube.com/watch?v=ai-gumm3Ois

https://gist.github.com/pauloafpjunior/053375a6821d7e305a31d13d0b12345c