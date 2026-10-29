# SEO — estratégia e estado técnico

> Palavras-chave abaixo são **hipóteses estratégicas** derivadas do conteúdo real do site. Não há dados de volume de busca
> (nenhuma ferramenta/Search Console conectada). Nenhum posicionamento é garantido ou foi verificado.

## Arquitetura de idiomas (o que foi feito e por quê)
| URL | Idioma | Indexável | Canonical |
|---|---|---|---|
| `/` | PT (padrão) | sim | ela mesma |
| `/en` | EN | sim | ela mesma |
| `/privacidade`, `/en/privacy`, `/de/datenschutz`, `/impressum`, `/en/impressum`, `/de/impressum` | PT/EN/DE | **não** (`noindex, follow`) | ela mesma |

* Antes: idioma só em estado React → uma única URL, `hreflang` impossível. Agora o idioma está na URL; `/` continua em português para todo visitante novo.
* `hreflang` (`pt`, `en`, `x-default`) e canonical por rota: gerados em `scripts/postbuild-seo.mjs` (HTML estático por rota, importante para crawlers/redes sociais que não executam JS) e mantidos em `src/lib/seo.ts` na navegação do navegador.
* `sitemap.xml` só lista URLs indexáveis e canônicas (`/` e `/en`), com `xhtml:link` de idioma. `robots.txt` permite tudo e aponta o sitemap; as páginas legais são `noindex` (não bloqueadas, para o Google ler a diretiva).
* Domínio: vem de `VITE_SITE_URL` (padrão `https://elaineteixeira.com`, o mesmo que já estava no projeto). **Não confirmado pela cliente.**

## Hipóteses de palavras-chave (uma intenção por URL)
| Intenção | Termos-semente | Onde aparece (conteúdo real) |
|---|---|---|
| Marca / navegacional | Elaine Teixeira; Elaine Teixeira psicóloga | título, H1/logo, `Person` JSON-LD, Sobre mim |
| Público brasileiro no exterior (PT) | psicóloga brasileira em Berlim; psicóloga para brasileiros no exterior; terapia online em português | `/` — título, descrição, Hero, "Entre culturas" |
| Aconselhamento intercultural | aconselhamento psicológico intercultural; luto migratório; saúde mental de migrantes/expatriados | seção Terapia / Entre culturas |
| Público internacional (EN) | Brazilian psychologist Berlin; intercultural psychologist; therapy for expats/migrants Berlin | `/en` |
| Consultoria B2B / terceiro setor | consultoria MHPSS; mental health and psychosocial support consultant | seção Consultorias |
| Mercado alemão | *Psychologin Berlin portugiesisch/englisch* — **só faria sentido com conteúdo alemão real**; não implementado (não há tradução de qualidade; as páginas DE são apenas legais) | — |

Não foram inventadas especialidades: tudo vem de `pt.json`/`en.json`.

## Dados estruturados (JSON-LD)
`WebSite` + `Person` + `ProfessionalService`, apenas com dados já públicos no site (nome, cargo, idiomas, cidade, e-mail, LinkedIn, imagem). **Sem** avaliações/depoimentos, preços, endereço, certificações. O tipo `Psychologist` que existia **não existe** no schema.org e o `SearchAction` apontava para uma busca inexistente — ambos removidos. Validar em https://validator.schema.org e no Teste de Resultados Enriquecidos.

## Pendências / ações da proprietária
1. Confirmar o domínio oficial (e HTTPS + redirecionamento www ↔ apex).
2. Verificar a propriedade no **Google Search Console** (tipo "Domínio" via DNS TXT) e enviar `https://<domínio>/sitemap.xml`; opcional: Bing Webmaster Tools.
3. Criar/reivindicar o **Perfil da Empresa no Google** *somente* se houver endereço profissional público (a marcação de endereço não foi inventada).
4. Conteúdo: páginas/artigos próprios por intenção (ex.: luto migratório, integração na Alemanha) ampliam a cobertura de busca — exige texto real da cliente.
5. Medir Core Web Vitals em produção (PageSpeed Insights/CrUX); o build tem fontes locais (`woff2`), imagens `webp` e lazy-load, mas não foi medido em rede real.
