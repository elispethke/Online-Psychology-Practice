# Auditoria de privacidade e obrigações legais (Alemanha/UE)

> Rascunho **técnico**. Não é aconselhamento jurídico e **não declara conformidade**. Requer revisão por advogado(a) especializado(a) em proteção de dados.

## 1. Fontes consultadas
* TDDDG § 25 (gesetze-im-internet.de/ttdsg/__25.html): armazenamento/acesso no terminal só com consentimento, exceto o "unbedingt erforderlich" (Abs. 2 Nr. 2).
* DDG § 5 (gesetze-im-internet.de/ddg/__5.html): dados do Impressum.
* DSK, *Orientierungshilfe Digitale Dienste* (nov/2024, Rn. 130–137): a recusa deve ser alternativa clara e **equivalente** (tamanho, cor, contraste, tipografia) ao consentimento; Rn. 88: a DSK **não** afirma que medição de audiência é, em geral, isenta de consentimento (análise caso a caso).
* Autoridade de Berlim (datenschutz-berlin.de): endereço/e-mail usados na seção de reclamação.
* Plausible (plausible.io/data-policy) e EmailJS (emailjs.com/legal/privacy-policy): descrições dos próprios fornecedores.
* GDPR/DSGVO (arts. 4, 6, 7, 9, 13–22, 28, 44 ss., 77): texto da UE (EUR-Lex) — não reconsultado nesta sessão, citado pelos artigos conhecidos.

## 2. Inventário real (do código)
| Tecnologia | Dados / efeito | Antes | Agora |
|---|---|---|---|
| Google Fonts (`fonts.googleapis.com`, `gstatic`) | IP do visitante enviado ao Google | carregava sempre | **removido** — fontes locais (`@fontsource`) |
| Plausible (`plausible.io/js/script.js`) | medição de audiência; sem cookies/local storage segundo o fornecedor | carregava sempre | **só após opt-in** (categoria "Estatística") |
| EmailJS (`api.emailjs.com`) | nome, e-mail, assunto, mensagem → EmailJS Pte. Ltd., servidores nos EUA (AWS), SCCs segundo o fornecedor | sem aviso nem consentimento | aviso na política + caixa de consentimento obrigatória + aviso para não enviar dados de saúde + honeypot |
| `localStorage.consent_preferences` | escolha do visitante | `cookie_consent` ("continuar = aceitar") | versão/categoria/data; recusar = aceitar em peso visual |
| `localStorage.contact_last_submit` | anti-abuso | guardava **e-mail** + hora | guarda **só a hora** |
| Cookies | — | nenhum | nenhum |
| WhatsApp (`wa.me`), LinkedIn, eproxstudio.com | links; nada carrega antes do clique | idem | descrito na política |
| Mapas, vídeos, pixels, Meta/Google Ads | **não existem** | — | — |

Cabeçalhos de segurança + CSP em `vercel.json` (HSTS, nosniff, frame DENY, Referrer-Policy, Permissions-Policy, CSP restrita a `self`, plausible.io e api.emailjs.com). **Só valem se a hospedagem for Vercel** (inferido de `@vercel/node`; não confirmado).

## 3. O que ficou como decisão consciente (a revisar juridicamente)
* Plausible foi **condicionado a consentimento** por prudência (DSK Rn. 88; o fornecedor afirma que não precisa, mas isso é alegação comercial, não posição das autoridades).
* Base jurídica do formulário: art. 6(1)(b)/(f) + consentimento explícito art. 9(2)(a) caso a pessoa inclua dados de saúde. Necessidade de **contrato de tratamento (art. 28)** e avaliação de **transferência para os EUA** (EmailJS): a confirmar.
* Dever de **sigilo e guarda de registros** de uma psicóloga atuando na Alemanha (e a validade do título "Psicóloga/CRP" lá): não verificado — definir prazo de retenção das mensagens.

## 4. PENDÊNCIAS que só a cliente pode informar (a página mostra um marcador "pendente" no lugar de cada uma)
1. **Anschrift** (endereço postal ladungsfähig) — obrigatório (§ 5 DDG).
2. Conselho/registro competente (a página assume "CRP 06/55288" como título profissional; confirmar órgão e situação na Alemanha) e **autoridade de supervisão**, se houver autorização exigida.
3. **USt-IdNr.** (se existir).
4. **Provedor de hospedagem** e sua política de logs.
5. **Provedor da caixa de e-mail** que recebe as mensagens (o endereço atual é `@gmail.com`).
6. Se a sede é mesmo **Berlim** (determina a autoridade de proteção de dados citada).
7. Prazos de retenção das mensagens e se há dever profissional de guarda.
8. Se a atividade exige texto de **resolução de litígios de consumo (VSBG § 36)** — avaliar com advogado(a).
9. Revisão jurídica final das três versões (DE/PT/EN) e das páginas DE (hoje apenas as páginas legais existem em alemão).
