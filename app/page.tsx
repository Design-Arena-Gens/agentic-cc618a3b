'use client';

import { useState, useEffect } from 'react';

interface Lesson {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string;
      examples: string[];
    }[];
  };
  completed: boolean;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface VocabWord {
  word: string;
  translation: string;
  example: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('lessons');
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [vocabScore, setVocabScore] = useState(0);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'الأساسيات - التحيات والتعارف',
      titleEn: 'Greetings and Introductions',
      description: 'تعلم كيفية التحية والتعريف عن نفسك بالإنجليزية',
      content: {
        intro: 'Learning how to greet people and introduce yourself is the foundation of English communication.',
        sections: [
          {
            title: 'Basic Greetings',
            content: 'Common ways to say hello and goodbye in English.',
            examples: [
              '<strong>Hello</strong> - مرحباً',
              '<strong>Good morning</strong> - صباح الخير',
              '<strong>Good afternoon</strong> - مساء الخير',
              '<strong>Good evening</strong> - مساء الخير (المساء)',
              '<strong>Goodbye</strong> - وداعاً',
              '<strong>See you later</strong> - أراك لاحقاً'
            ]
          },
          {
            title: 'Introducing Yourself',
            content: 'How to tell others about yourself.',
            examples: [
              '<strong>My name is...</strong> - اسمي...',
              '<strong>I am from...</strong> - أنا من...',
              '<strong>Nice to meet you</strong> - سعيد بلقائك',
              '<strong>How are you?</strong> - كيف حالك؟',
              '<strong>I am fine, thank you</strong> - أنا بخير، شكراً'
            ]
          }
        ]
      },
      completed: false
    },
    {
      id: 2,
      title: 'الأفعال الأساسية',
      titleEn: 'Basic Verbs',
      description: 'تعلم أهم الأفعال المستخدمة يومياً',
      content: {
        intro: 'Verbs are action words. These are the most common verbs you will use every day.',
        sections: [
          {
            title: 'Common Action Verbs',
            content: 'Essential verbs for daily communication.',
            examples: [
              '<strong>to be</strong> - يكون (am, is, are)',
              '<strong>to have</strong> - يملك (have, has)',
              '<strong>to do</strong> - يفعل (do, does)',
              '<strong>to go</strong> - يذهب',
              '<strong>to come</strong> - يأتي',
              '<strong>to see</strong> - يرى',
              '<strong>to want</strong> - يريد',
              '<strong>to make</strong> - يصنع',
              '<strong>to know</strong> - يعرف',
              '<strong>to think</strong> - يفكر'
            ]
          },
          {
            title: 'Present Simple Tense',
            content: 'Using verbs in present tense.',
            examples: [
              '<strong>I go</strong> to school every day - أذهب إلى المدرسة كل يوم',
              '<strong>She likes</strong> coffee - هي تحب القهوة',
              '<strong>They play</strong> football - هم يلعبون كرة القدم',
              '<strong>We study</strong> English - نحن ندرس الإنجليزية'
            ]
          }
        ]
      },
      completed: false
    },
    {
      id: 3,
      title: 'الأرقام والوقت',
      titleEn: 'Numbers and Time',
      description: 'تعلم الأرقام وكيفية قراءة الساعة',
      content: {
        intro: 'Numbers and time expressions are essential for daily life.',
        sections: [
          {
            title: 'Numbers 1-20',
            content: 'Basic counting in English.',
            examples: [
              '<strong>1-10:</strong> one, two, three, four, five, six, seven, eight, nine, ten',
              '<strong>11-20:</strong> eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty'
            ]
          },
          {
            title: 'Telling Time',
            content: 'How to express time in English.',
            examples: [
              '<strong>What time is it?</strong> - كم الساعة؟',
              '<strong>It is 3 o\'clock</strong> - الساعة الثالثة',
              '<strong>It is 3:30</strong> - الساعة الثالثة والنصف',
              '<strong>It is 3:15</strong> - الساعة الثالثة والربع',
              '<strong>Morning/Afternoon/Evening/Night</strong> - صباح/ظهيرة/مساء/ليل'
            ]
          }
        ]
      },
      completed: false
    },
    {
      id: 4,
      title: 'الأسئلة الشائعة',
      titleEn: 'Common Questions',
      description: 'تعلم كيفية طرح الأسئلة المهمة',
      content: {
        intro: 'Question words help you gather information and have conversations.',
        sections: [
          {
            title: 'Question Words',
            content: 'The main words used to ask questions.',
            examples: [
              '<strong>What</strong> - ماذا',
              '<strong>Where</strong> - أين',
              '<strong>When</strong> - متى',
              '<strong>Who</strong> - من',
              '<strong>Why</strong> - لماذا',
              '<strong>How</strong> - كيف',
              '<strong>Which</strong> - أي'
            ]
          },
          {
            title: 'Example Questions',
            content: 'Using question words in sentences.',
            examples: [
              '<strong>What is your name?</strong> - ما اسمك؟',
              '<strong>Where are you from?</strong> - من أين أنت؟',
              '<strong>When is your birthday?</strong> - متى عيد ميلادك؟',
              '<strong>How old are you?</strong> - كم عمرك؟',
              '<strong>Why are you learning English?</strong> - لماذا تتعلم الإنجليزية؟'
            ]
          }
        ]
      },
      completed: false
    }
  ];

  const questions: Question[] = [
    {
      id: 1,
      question: 'How do you say "مرحباً" in English?',
      options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
      correct: 1,
      explanation: 'Hello means مرحباً in English. It is the most common greeting.'
    },
    {
      id: 2,
      question: 'What is the correct way to introduce yourself?',
      options: ['I have Ahmed', 'My name is Ahmed', 'I called Ahmed', 'My called is Ahmed'],
      correct: 1,
      explanation: 'We use "My name is..." to introduce ourselves in English.'
    },
    {
      id: 3,
      question: 'Which verb means "يذهب"?',
      options: ['to come', 'to see', 'to go', 'to do'],
      correct: 2,
      explanation: '"To go" means يذهب in English.'
    },
    {
      id: 4,
      question: 'How do you ask "كم الساعة؟" in English?',
      options: ['What is time?', 'What time is it?', 'How is time?', 'When is time?'],
      correct: 1,
      explanation: '"What time is it?" is the correct way to ask for the time.'
    },
    {
      id: 5,
      question: 'Complete: "I ___ to school every day"',
      options: ['goes', 'going', 'go', 'went'],
      correct: 2,
      explanation: 'With "I", we use the base form of the verb: "I go"'
    }
  ];

  const vocabulary: VocabWord[] = [
    { word: 'Hello', translation: 'مرحباً', example: 'Hello, how are you?' },
    { word: 'Thank you', translation: 'شكراً لك', example: 'Thank you for your help.' },
    { word: 'Please', translation: 'من فضلك', example: 'Can you help me, please?' },
    { word: 'Yes', translation: 'نعم', example: 'Yes, I agree with you.' },
    { word: 'No', translation: 'لا', example: 'No, I don\'t want coffee.' },
    { word: 'Water', translation: 'ماء', example: 'I drink water every day.' },
    { word: 'Food', translation: 'طعام', example: 'This food is delicious.' },
    { word: 'House', translation: 'منزل', example: 'My house is near the school.' },
    { word: 'School', translation: 'مدرسة', example: 'I go to school in the morning.' },
    { word: 'Friend', translation: 'صديق', example: 'He is my best friend.' },
    { word: 'Family', translation: 'عائلة', example: 'I love my family.' },
    { word: 'Today', translation: 'اليوم', example: 'Today is Monday.' },
    { word: 'Tomorrow', translation: 'غداً', example: 'See you tomorrow!' },
    { word: 'Happy', translation: 'سعيد', example: 'I am happy today.' },
    { word: 'Beautiful', translation: 'جميل', example: 'The weather is beautiful.' },
    { word: 'Good', translation: 'جيد', example: 'This is a good book.' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
    const savedScore = localStorage.getItem('vocabScore');
    if (savedScore) {
      setVocabScore(parseInt(savedScore));
    }
  }, []);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      localStorage.setItem('completedLessons', JSON.stringify(updated));
    }
    setSelectedLesson(null);
  };

  const handleVocabClick = () => {
    const newScore = vocabScore + 1;
    setVocabScore(newScore);
    localStorage.setItem('vocabScore', newScore.toString());
  };

  const renderStats = () => (
    <div className="stats-container">
      <div className="stat-card">
        <h3>{completedLessons.length}</h3>
        <p>دروس مكتملة</p>
      </div>
      <div className="stat-card">
        <h3>{score}</h3>
        <p>نقاط الاختبار</p>
      </div>
      <div className="stat-card">
        <h3>{vocabScore}</h3>
        <p>كلمات متعلمة</p>
      </div>
      <div className="stat-card">
        <h3>{Math.round((completedLessons.length / lessons.length) * 100)}%</h3>
        <p>نسبة الإنجاز</p>
      </div>
    </div>
  );

  const renderLessons = () => {
    if (selectedLesson !== null) {
      const lesson = lessons.find(l => l.id === selectedLesson);
      if (!lesson) return null;

      return (
        <div className="lesson-detail">
          <button className="button back-button" onClick={() => completeLesson(selectedLesson)}>
            ← العودة للدروس
          </button>
          <h2>{lesson.titleEn}</h2>
          <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#666' }}>{lesson.content.intro}</p>

          {lesson.content.sections.map((section, idx) => (
            <div key={idx} className="section">
              <h3>{section.title}</h3>
              <p style={{ marginBottom: '20px', fontSize: '1.1em' }}>{section.content}</p>
              <ul className="examples">
                {section.examples.map((example, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: example }} />
                ))}
              </ul>
            </div>
          ))}

          <button className="button" onClick={() => completeLesson(selectedLesson)} style={{ marginTop: '30px' }}>
            إكمال الدرس ✓
          </button>
        </div>
      );
    }

    return (
      <div className="lesson-list">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`lesson-item ${completedLessons.includes(lesson.id) ? 'completed' : ''}`}
            onClick={() => setSelectedLesson(lesson.id)}
          >
            <div className="lesson-info">
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
            </div>
            <span className={`lesson-badge ${completedLessons.includes(lesson.id) ? 'completed' : 'new'}`}>
              {completedLessons.includes(lesson.id) ? '✓ مكتمل' : 'جديد'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderQuiz = () => {
    if (currentQuestion >= questions.length) {
      return (
        <div className="quiz-container">
          <h2>🎉 أحسنت!</h2>
          <div className="question-card">
            <h3 style={{ fontSize: '2em', color: '#667eea' }}>
              لقد أجبت على {score} من {questions.length} أسئلة بشكل صحيح
            </h3>
            <div className="progress-bar-container" style={{ margin: '30px 0' }}>
              <div className="progress-bar" style={{ width: `${(score / questions.length) * 100}%` }}>
                {Math.round((score / questions.length) * 100)}%
              </div>
            </div>
            <button className="button" onClick={resetQuiz}>
              ابدأ الاختبار من جديد
            </button>
          </div>
        </div>
      );
    }

    const question = questions[currentQuestion];

    return (
      <div className="quiz-container">
        <div className="progress-section">
          <h3>السؤال {currentQuestion + 1} من {questions.length}</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}>
              {currentQuestion + 1}/{questions.length}
            </div>
          </div>
        </div>

        <div className="question-card">
          <p className="question-text">{question.question}</p>
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  showFeedback
                    ? index === question.correct
                      ? 'correct'
                      : index === selectedAnswer
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <>
              <div className={`feedback ${selectedAnswer === question.correct ? 'correct' : 'incorrect'}`}>
                {selectedAnswer === question.correct ? '✓ إجابة صحيحة!' : '✗ إجابة خاطئة'}
                <p style={{ marginTop: '10px', fontSize: '0.9em' }}>{question.explanation}</p>
              </div>
              <button className="button" onClick={nextQuestion}>
                {currentQuestion < questions.length - 1 ? 'السؤال التالي →' : 'إنهاء الاختبار'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderVocabulary = () => (
    <div>
      <h2 style={{ marginBottom: '30px', color: '#333' }}>قاموس الكلمات الأساسية</h2>
      <p style={{ marginBottom: '30px', color: '#666', fontSize: '1.1em' }}>
        انقر على أي بطاقة لحفظها في ذاكرتك!
      </p>
      <div className="vocabulary-grid">
        {vocabulary.map((item, index) => (
          <div key={index} className="vocab-card" onClick={handleVocabClick}>
            <div className="word">{item.word}</div>
            <div className="translation">{item.translation}</div>
            <div className="example">{item.example}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <h1>📚 تعلم الإنجليزية</h1>
        <p>تطبيق تفاعلي لتعلم اللغة الإنجليزية بطريقة ممتعة وسهلة</p>
      </div>

      {renderStats()}

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          📖 الدروس
        </button>
        <button
          className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          ✏️ الاختبار
        </button>
        <button
          className={`tab-button ${activeTab === 'vocabulary' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocabulary')}
        >
          📝 المفردات
        </button>
      </div>

      <div className="content-area">
        {activeTab === 'lessons' && renderLessons()}
        {activeTab === 'quiz' && renderQuiz()}
        {activeTab === 'vocabulary' && renderVocabulary()}
      </div>
    </div>
  );
}
