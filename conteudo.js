/* PERSONALIZE AQUI: textos, músicas, links e perguntas. Não precisa mexer no script.js. */
window.SITE_CONTENT = {
  instagramUrl: "https://www.instagram.com/SEU_USUARIO/",
  whatsappUrl: "https://wa.me/55SEUNUMERO?text=Oi%21%20Passei%20pelo%20site%20e%20quis%20te%20mandar%20uma%20mensagem.%20%F0%9F%92%9B",
  /* TRILHA: um bloco por capítulo, na ordem do site (0 = abertura ... 7 = final).
     - file: nome do MP3 dentro da pasta /musicas (o nome precisa ser IDÊNTICO)
     - reason: a mensagem que aparece no player
     Para trocar uma música: mude title, artist e file, e coloque o novo MP3 na pasta. */
  tracks: {
    0: { title: "Uma melodia para começar", artist: "Instrumental", file: "musicas/abertura.mp3", reason: "Escolhi uma melodia delicada para abrir esta pequena história com calma, como quem começa a folhear um álbum de lembranças." },
    1: { title: "Cadeira Cativa", artist: "", file: "musicas/cadeira-cativa.mp3", reason: "Escolhi essa música porque, com toda certeza, foi uma das que mais ouvi você cantar. E sei o quanto você gosta dela. Então, não tinha como deixar essa de fora. Acho que algumas músicas acabam ficando associadas a uma pessoa, mesmo sem a gente planejar." },
    2: { title: "Última Saudade", artist: "Henrique & Juliano", file: "musicas/ultima-saudade.mp3", reason: "Escolhi essa porque você ouvia muito, além de serem um dos seus cantores favoritos. Lembro de você me contando que ainda iria a um show deles. Então, essa música também me faz lembrar de uma coisa que você gostava e compartilhava comigo." },
    3: { title: "Eu Te Seguro", artist: "Panda", file: "musicas/eu-te-seguro.mp3", reason: "Quero que você nunca se esqueça do quanto é linda. Não falo apenas da sua beleza, mas também da pessoa especial que você é. Nunca duvide disso, nem mesmo nos dias em que você não conseguir enxergar o quanto é incrível." },
    4: { title: "Pós", artist: "Felipe & Rodrigo", file: "musicas/pos.mp3", reason: "Não cheguei a ouvir essa com você, mas eu sei que você deve ter ouvido essa diversas vezes. Então, aqui está ela, dedicada a você." },
    5: { title: "Mudando de Assunto", artist: "Henrique & Juliano", file: "musicas/mudando-de-assunto.mp3", reason: "Essa daqui sou eu que dedico para você, afinal, você me ensinou esse gosto musical e é claro que vou usar com você." },
    6: { title: "Uma trilha para recordar", artist: "Instrumental", file: "musicas/quiz.mp3", reason: "Uma música leve para acompanhar as perguntas. Não é uma prova: é só uma brincadeira com lembranças." },
    7: { title: "Para os próximos capítulos", artist: "Escolher depois", file: "musicas/final.mp3", reason: "Guardei esta música para o final porque queria que as lanternas subissem acompanhadas de uma sensação bonita: a de que ainda podem existir boas possibilidades, se os dois quiserem." }
  },
  quiz: [
    { phase: "FASE 1 · VOCÊ LEMBRA?", q: "O que costumávamos fazer quando você saía do estágio mais cedo?", options: ["Íamos direto para casa", "Bebíamos copão e conversávamos na calçada", "Íamos ao cinema", "Fazíamos uma caminhada na praia"], correct: 1, reveal: "Um copão, uma conversa na calçada e tempo para colocar o papo em dia. Às vezes, era só disso que a gente precisava." },
    { phase: "FASE 1 · VOCÊ LEMBRA?", q: "Qual é a minha matéria favorita?", options: ["Direito Civil", "Direito Constitucional", "Direito Penal", "Processo Civil"], correct: 2, reveal: "Direito Penal! Essa você tinha como saber." },
    { phase: "FASE 1 · VOCÊ LEMBRA?", q: "Qual profissão você sempre me contou que era seu sonho?", options: ["Delegada", "Advogada Criminalista", "Promotora", "Juíza"], correct: 1, reveal: "Advogada Criminalista. Um sonho que você compartilhou comigo e que ficou guardado na memória." },
    { phase: "FASE 1 · VOCÊ LEMBRA?", q: "O que prometemos um ao outro?", options: ["Nunca discordar", "Viajar juntos todo ano", "Se apoiar até o final", "Nunca mudar"], correct: 2, reveal: "Se apoiar até o final. Uma promessa sobre estar presente e desejar o bem um do outro." },
    { phase: "FASE 2 · SENHORITINHA", q: "Qual apelido eu costumava usar com você?", options: ["Princesa", "Senhoritinha", "Pequena", "Rapunzel"], correct: 1, reveal: "Senhoritinha! Uma brincadeira que virou uma marca registrada das nossas conversas." },
    { phase: "FASE 2 · SENHORITINHA", q: "Qual personagem da Disney você gosta?", options: ["Ariel", "Cinderela", "Rapunzel", "Mulan"], correct: 2, reveal: "Rapunzel, de Enrolados. E o símbolo do sol também tem um significado especial para você." },
    { phase: "FASE 2 · SENHORITINHA", q: "Qual série você gosta?", options: ["Outer Banks", "Friends", "Bridgerton", "The Office"], correct: 0, reveal: "Outer Banks! Uma referência que combina com aquele clima de aventura e dias sem muita programação." },
    { phase: "FASE 2 · SENHORITINHA", q: "Qual música você costumava cantar bastante?", options: ["Cadeira Cativa", "Evidências", "Boate Azul", "Atrasadinha"], correct: 0, reveal: "Cadeira Cativa. Tem músicas que acabam ficando associadas a uma pessoa, mesmo sem a gente planejar." }
  ]
};
