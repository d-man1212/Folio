const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDWVdXSe3mS29wY4hSgaQ-BN5OxDrTOYR8";

router.get('/:description', async (req, res) => {
    try {
        const description = req.params.description;

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
            temperature: 0.9,
            topK: 1,    
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        const parts = [
            {text: "You are an AI Chatbot your purpose is to to be given with description of book titles and you are to classify them among these 13 genres. Here are the 13 genres love, horror, comedy, drama, action, fiction, fantasy, biography, documentry, journal, education, crime, children. You shouldnt perform any other task including programming languages code or do basic mathematical operations only the 13 genres you should classify the given description of the book to one of the 13 genres. You need to map the description depending on the context and map it with the one of the 13 genres and show the output as the genre which fits the description alone. only one genre should be there."},
            {text: "input: Discusses \\\"loving too much\\\" as a pattern of thoughts, feelings, and behaviors which certain women develop as a reponse to various problems in their family backgrounds."},
            {text: "output: Love"},
            {text: "input: Few of us have been spared the agonies of intimate relationships. They come in many shapes: loving a man or a woman who will not commit to us, being heartbroken when we're abandoned by a lover, engaging in Sisyphean internet searches, coming back lonely from bars, parties, or blind dates, feeling bored in a relationship that is so much less than we had envisaged - these are only some of the ways in which the search for love is a difficult and often painful experience. Despite the widespread and almost collective character of these experiences, our culture insists they are the result of faulty or insufficiently mature psyches. For many, the Freudian idea that the family designs the pattern of an individual's erotic career has been the main explanation for why and how we fail to find or sustain love. Psychoanalysis and popular psychology have succeeded spectacularly in convincing us that individuals bear responsibility for the misery of their romantic and erotic lives. The purpose of this book is to change our way of thinking about what is wrong in modern relationships. The problem is not dysfunctional childhoods or insufficiently self-aware psyches, but rather the institutional forces shaping how we love. The argument of this book is that the modern romantic experience is shaped by a fundamental transformation in the ecology and architecture of romantic choice. The samples from which men and women choose a partner, the modes of evaluating prospective partners, the very importance of choice and autonomy and what people imagine to be the spectrum of their choices: all these aspects of choice have transformed the very core of the will, how we want a partner, the sense of worth bestowed by relationships, and the organization of desire. This book does to love what Marx did to commodities: it shows that it is shaped by social relations and institutions and that it circulates in a marketplace of unequal actors."},
            {text: "output: Love"},
            {text: "input: Analyzes the feelings and problems involved in different types of human love, including familial affection, friendship, passion, and charity."},
            {text: "output: Love"},
            {text: "input: Collects short stories chronicling Simon's journey from amnesia to Ascension, as he works to regain his lost life while attending the Shadowhunter Academy."},
            {text: "output: Horror"},
            {text: "input: Billy Halleck's nightmare begins after he sideswipes an old Gypsy woman as she is crossing the street: he loses ninety-three pounds within six weeks."},
            {text: "output: Horror"},
            {text: "input: Playing with her little brother by the ocean, Cindy is stunned when Neil is kidnapped by a ghost and everyone thinks that he really drowned, but a newspaper report about local spook activity compels Cindy to get her brother back."},
            {text: "output: Horror"},
            {text: "input: An annotated version of William Shakespeare's classic play with introduction and essay by Harold Bloom."},
            {text: "output: Comedy"},
            {text: "input: The second edition of The Merchant of Venice, featuring a new introductory section by Charles Edelman."},
            {text: "output: Comedy"},
            {text: "input: The First Quarto, 1600 : a Fac-simile in Photo-lithography"},
            {text: "output: Comedy"},
            {text: "input: Edited by world-renowned lesbian fantasy author Nicola Griffith and fantasy publisher Stephen Pagel, this groundbreaking anthology of stories brings together some of mainstream's and sci-fi's most notable writers--gay and straight--creating worlds where time and place and sexuality are alternative to the empirical environment.\",\"industryIdentifiers"},
            {text: "output: Fiction"},
            {text: "input: This anthology contains fourteen intriguing stories by active research scientists and other writers trained in science. Science is at the heart of real science fiction, which is more than just westerns with ray guns or fantasy with spaceships. The people who do science and love science best are scientists. Scientists like Isaac Asimov, Arthur C. Clarke, and Fred Hoyle wrote some of the legendary tales of golden age science fiction. Today there is a new generation of scientists writing science fiction informed with the expertise of their fields, from astrophysics to computer science, biochemistry to rocket science, quantum physics to genetics, speculating about what is possible in our universe. Here lies the sense of wonder only science can deliver. All the stories in this volume are supplemented by afterwords commenting on the science underlying each story."},
            {text: "output: Fiction"},
            {text: "input: Stories of 300 to 3,000 words from Asimov, Clarke, Heinlein, Kornbluth, Leiber, Sturgeon, et al. which have been selected to surprise, shock, and delight."},
            {text: "output: Fiction"},
            {text: "input: A comprehensive and authoritative single-volume reference work on the theatre arts of Asia-Oceania. Nine expert scholars provide entries on performance in twenty countries from Pakistan in the west, through India and Southeast Asia to China, Japan and Korea in the east. An introductory pan-Asian essay explores basic themes - they include ritual, dance, puppetry, training, performance and masks. The national entries concentrate on the historical development of theatre in each country, followed by entries on the major theatre forms, and articles on playwrights, actors and directors. The entries are accompanied by rare photographs and helpful reading lists."},
            {text: "output: Drama"},
            {text: "input: Stanley Webber is visited in his boarding house by strangers, Goldberg and McCann. An innocent-seeming birthday party for Stanley turns into a nightmare. The Birthday Party was first performed in 1958 and is now a modern classic, produced and studied throughout the world."},
            {text: "output: Drama"},
            {text: "input: The King of the Dark Chamber by Rabindranath Tagore, first published in 1914, is a rare manuscript, the original residing in one of the great libraries of the world. This book is a reproduction of that original, which has been scanned and cleaned by state-of-the-art publishing tools for better readability and enhanced appreciation. Restoration Editors' mission is to bring long out of print manuscripts back to life. Some smudges, annotations or unclear text may still exist, due to permanent damage to the original work. We believe the literary significance of the text justifies offering this reproduction, allowing a new generation to appreciate it."},
            {text: "output: Drama"},
            {text: "input: Michael Havelock's world died on a moonlit beach on the Costa Brava. He watched as his partner and lover, Jenna Karats, double agent, was efficiently gunned down by his own agency. There was nothing left for him but to quit the game, get out. Until, in one frantic moment on a crowded railroad platform in Rome, Havelock saw his Jenna alive. From then on, he was marked for death by both U.S. and Russian assassins, racing around the globe after his beautiful betrayer, trapped in a massive mosaic of treachery created by a top-level mole with the world in his fist--Parsifal."},
            {text: "output: Action"},
            {text: "input: He was dragged from the sea, his body riddled with bullets. There are a few clues: a frame of microfilm surgically implanted beneath the skin of his hip; evidence that plastic surgery has altered his face; strange things he says in his delirium, which could be code words. And a number on the film negative that leads to a bank account in Zurich, four million dollars, and a name for the amnesiac: Jason Bourne. Now he is running for his life. A man with an unknown past and an uncertain future, the target of assassins and at the heart of a deadly puzzle. He's fighting for survival and no one can help him - except the one woman who once wanted to escape him... Read by Jeff Harding"},
            {text: "output: Action"},
            {text: "input: Leaving the relative safety of the demigod training ground with his companions, a disgraced Apollo embarks on a quest across North America to find a dangerous ancient-world Oracle while navigating the challenges of the evil Triumvirate."},
            {text: "output: Action"},
            {text: "input: The adventures of the three darling children in Never-Never Land with Peter Pan, the boy who would not grow up."},
            {text: "output: Fantasy"},
            {text: "input: In this sequel to Alice in Wonderland, Alice climbs through a mirror in her room and enters a world similar to a chess board where she experiences many curious adventures with its fantastic inhabitants."},
            {text: "output: Fantasy"},
            {text: "input: The tales of Ratty, Mole, Badger and Toad. When Mole goes boating with the Water Rat instead of spring-cleaning, he discovers a new world. As well as the river and the Wild Wood, there is Toad's craze for fast travel which leads him and his friends on a whirl of trains, barges, gipsy caravans and motor cars and even into battle."},
            {text: "output: Fantasy"},
            {text: "input: From Isaacson, the bestselling author of \\\"Benjamin Franklin,\\\" comes the first full biography of Albert Einstein since all his papers have become available--a fully realized portrait of a premier icon of his era."},
            {text: "output: Biography"},
            {text: "input: In his final book before his death, Primo Levi returns once more to his time at Auschwitz in a moving meditation on memory, resiliency, and the struggle to comprehend unimaginable tragedy. Drawing on history, philosophy, and his own personal experiences, Levi asks if we have already begun to forget about the Holocaust. His last book before his death, Levi returns to the subject that would define his reputation as a writer and a witness. Levi breaks his book into eight essays, ranging from topics like the unreliability of memory to how violence twists both the victim and the victimizer. He shares how difficult it is for him to tell his experiences with his children and friends. He also debunks the myth that most of the Germans were in the dark about the Final Solution or that Jews never attempted to escape the camps. As the Holocaust recedes into the past and fewer and fewer survivors are left to tell their stories, The Drowned and the Saved is a vital first-person testament. Along with Elie Wiesel and Hannah Arendt, Primo Levi is remembered as one of the most powerful and perceptive writers on the Holocaust and the Jewish experience during World War II. This is an essential book both for students and literary readers. Reading Primo Levi is a lesson in the resiliency of the human spirit."},
            {text: "output: Biography"},
            {text: "input: The Number One international bestseller, Eat, Pray Love is a journey around the world, a quest for spiritual enlightenment and a story for anyone who has battled with divorce, depression and heartbreak."},
            {text: "output: Biography"},
            {text: "input: Fifth-grader Cody Carson keeps a journal of his hopes for a fresh start in a town where nobody knows about his humiliating mistakes of the past. but before school even begins so does his embarrassment."},
            {text: "output: Journal"},
            {text: "input: vol. 1. The Journal of Friedrich Hornemann's Travels from Cairo to Murzuk in the years 1797-98. The Letters of Major Alexander Gordon Laing, 1824-26. Edited by E. W. Bovill. pp. xi. 406. 1964"},
            {text: "output: Journal"},
            {text: "input: This book is a comprehensive guide to transvaginal sonography for practitioners. Divided into five sections, the text begins with discussion on general aspects of ultrasonography and transvaginal scanning. The following sections cover the use of ultrasonography in a variety if gynaecological and obstetrical circumstances. The final sections cover Doppler sonography and 3D and 4D transvaginal sonography. The third edition has been fully revised to provide clinicians with the latest advances in their field. Authored by an internationally recognised team of experts led by Zagreb-based Asim Kurjak and Madrid-based José Bajo Arenas, the text is further enhanced by nearly 700 ultrasound images, photographs, diagrams and tables. Key points Fully revised, third edition presenting latest advances in transvaginal sonography Highly illustrated with nearly 700 ultrasound images, photographs, diagrams and tables Internationally recognised editor and author team Previous edition (9789350904732) published in 2013"},
            {text: "output: Education"},
            {text: "input: Intolerance and bigotry lie at the heart of all human suffering. So claims Bertrand Russell at the outset of In Praise of Idleness, a collection of essays in which he espouses the virtues of cool reflection and free enquiry; a voice of calm in a world of maddening unreason. From a devastating critique of the ancestry of fascism to a vehement defence of 'useless' knowledge, with consideration given to everything from insect pests to the human soul, this is a tour de force that only Bertrand Russell could perform."},
            {text: "output: Education"},
            {text: "input: Rationality and freedom are among the most profound and contentious concepts in philosophy and the social sciences. In this, the first of two volumes, Amartya Sen brings clarity and insight to these difficult issues."},
            {text: "output: Education"},
            {text: "input: Abandoned at birth and threatened with a life in service, Defoe's young rebel sets her heart on independence. One fatal seduction and five husbands later, she resorts to a life of self-supporting crime."},
            {text: "output: Crime"},
            {text: "input: Bentham's treatise on the foundations of law and government."},
            {text: "output: Crime"},
            {text: "input: The revolt of 1857 led to an introspection about the efficiency and suitability of the police and judicial systems. Oudh being a new province, several significant experiments of far reaching import in these branches were tried there. A completely new police system was evolved there. A system of Honorary Magistrates was also developed. These and many other new features, after their inital trial in Oudh, were introduced in other provinces."},
            {text: "output: Crime"},
            {text: "input: A clock in a vacant house provides a clue to the whereabouts of a gang of harbor thieves"},
            {text: "output: Children"},
            {text: "input: When Genna is chosen as the Sunrider of prophecy, her destiny is to unite the magic of the sun and the moon for the good of both Nightlings and humans."},
            {text: "output: Children"},
            {text: "input: The members of the Baby-sitters Club split their time between babysitting and investigating the spooky noises behind Dawn's bedroom wall."},
            {text: "output: Children"},
            {text: "input: "+ description},
            {text: "output: "},
          ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        console.log(response.text());

        res.json(response.text());
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
