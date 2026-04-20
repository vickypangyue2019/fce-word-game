'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { WordFamily, GameState } from '@/types/fce';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw, Trophy, Star, Volume2, Flame, Award, Zap, BookText, RefreshCw, ArrowLeft, Loader2, Languages, X } from 'lucide-react';
import { getCurrentPlayer, saveGameRecord } from '@/lib/storage';

interface FCEWordGameProps {
  wordFamilies: WordFamily[];
}

export function FCEWordGame({ wordFamilies }: FCEWordGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    isPlaying: true,
    wordFamilies: wordFamilies,
    combo: 0,
    maxCombo: 0
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showComboAnimation, setShowComboAnimation] = useState(false);
  const [showPraise, setShowPraise] = useState<string | null>(null);

  const [wrongAnswers, setWrongAnswers] = useState<Array<{
    wordFamily: WordFamily;
    selectedAnswer: string;
    correctAnswer: string;
  }>>([]);

  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFamilies, setReviewFamilies] = useState<WordFamily[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  const [selectedText, setSelectedText] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelectedText(null);
        return;
      }

      const text = selection.toString().trim();
      if (text && text.length > 0 && text.length < 100) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectedText({
          text,
          x: rect.left + window.scrollX + rect.width / 2,
          y: rect.top + window.scrollY - 10
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.selection-menu')) {
        setSelectedText(null);
        setShowTranslation(false);
      }
    };

    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const translateText = async (text: string) => {
    setIsTranslating(true);
    setShowTranslation(true);
    setTranslation(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang: 'zh' }),
      });

      if (!response.ok) throw new Error('Translation failed');

      const data = await response.json();
      setTranslation(data.translation);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslation('翻译失败，请重试');
    } finally {
      setIsTranslating(false);
    }
  };

  const speakSelectedText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const praiseMessages = {
    basic: ['太棒了！', '真厉害！', '答对了！', '聪明！', '很棒！', '继续保持！', '非常好！', '做得好！'],
    good: ['厉害！连续答对！', '你的词汇量真丰富！', '这题也难不倒你！', '学习能力超强！', '继续保持这股劲！'],
    great: ['太厉害了！连续答对！', '你是词性转换大师！', '这反应速度也太快了吧！', '简直是FCE词汇专家！', '太牛了！'],
    amazing: ['太强了！无人能挡！', '这波操作简直完美！', '词汇天王！就是你！', '无敌是多么寂寞！', '这就是实力！'],
    firstCorrect: ['好的开始是成功的一半！', '首战告捷！', '开门红！继续加油！', '第一步走得很稳！'],
  };

  const getRandomPraise = (combo: number, isFirstCorrect: boolean) => {
    let category: keyof typeof praiseMessages;
    if (isFirstCorrect) category = 'firstCorrect';
    else if (combo >= 6) category = 'amazing';
    else if (combo >= 4) category = 'great';
    else if (combo >= 2) category = 'good';
    else category = 'basic';

    const messages = praiseMessages[category];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const currentFamily = gameState.wordFamilies[gameState.currentLevel];
  const progress = ((gameState.currentLevel + 1) / gameState.wordFamilies.length) * 100;

  const speakWord = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentFamily.exercise.answer;

    if (isCorrect) {
      const newCombo = (gameState.combo || 0) + 1;
      const bonusScore = Math.floor(newCombo * 2);
      setShowComboAnimation(true);
      setTimeout(() => setShowComboAnimation(false), 1500);

      const isFirstCorrect = gameState.totalQuestions === 0;
      const praise = getRandomPraise(newCombo, isFirstCorrect);
      setShowPraise(praise);
      setTimeout(() => setShowPraise(null), 2000);

      setGameState(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        totalQuestions: prev.totalQuestions + 1,
        score: prev.score + 10 + bonusScore,
        combo: newCombo,
        maxCombo: Math.max(prev.maxCombo || 0, newCombo)
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        combo: 0,
      }));

      setWrongAnswers(prev => [
        ...prev,
        {
          wordFamily: currentFamily,
          selectedAnswer: answer,
          correctAnswer: currentFamily.exercise.answer
        }
      ]);
    }
  };

  const saveLevelProgress = () => {
    try {
      const currentPlayer = getCurrentPlayer();
      if (!currentPlayer) return;

      const percentage = gameState.totalQuestions > 0
        ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100)
        : 0;

      const stars = Math.ceil(percentage / 20);

      saveGameRecord({
        id: Date.now().toString(),
        playerName: currentPlayer.name,
        score: gameState.score || 0,
        wordsCompleted: gameState.correctAnswers || 0,
        streak: gameState.maxCombo || 0,
        stars: stars || 0,
        playedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving level progress:', error);
    }
  };

  const nextLevel = () => {
    saveLevelProgress();

    if (gameState.currentLevel < gameState.wordFamilies.length - 1) {
      setGameState(prev => ({ ...prev, currentLevel: prev.currentLevel + 1 }));
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExamples(false);
      setFlippedCard(null);
      setShowPraise(null);
    } else {
      setGameComplete(true);
    }
  };

  const previousLevel = () => {
    if (gameState.currentLevel > 0) {
      setGameState(prev => ({ ...prev, currentLevel: prev.currentLevel - 1 }));
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExamples(false);
      setFlippedCard(null);
      setShowPraise(null);
    }
  };

  const startReviewMode = () => {
    const uniqueFamilies = wrongAnswers.reduce((acc, wrong) => {
      if (!acc.find(f => f.root === wrong.wordFamily.root)) {
        acc.push(wrong.wordFamily);
      }
      return acc;
    }, [] as WordFamily[]);

    setReviewFamilies(uniqueFamilies);
    setReviewIndex(0);
    setReviewMode(true);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExamples(false);
    setFlippedCard(null);
  };

  const resetGame = () => {
    setGameState({
      currentLevel: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      isPlaying: true,
      wordFamilies: wordFamilies,
      combo: 0,
      maxCombo: 0
    });
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExamples(false);
    setFlippedCard(null);
    setGameComplete(false);
    setShowPraise(null);
    setWrongAnswers([]);
    setReviewMode(false);
    setReviewFamilies([]);
    setReviewIndex(0);
  };

  const exitReviewMode = () => {
    setReviewMode(false);
    setReviewFamilies([]);
    setReviewIndex(0);
  };

  if (gameComplete) {
    const percentage = gameState.totalQuestions > 0
      ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100)
      : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-8 text-center shadow-2xl border-2 border-purple-200">
            <div className="flex justify-center mb-6">
              <Trophy className="w-24 h-24 text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">关卡完成！</h1>
            <p className="text-2xl text-gray-600 mb-6">
              本关得分：<span className="text-3xl font-bold text-purple-600">{gameState.score}</span>
            </p>
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-xl">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="font-semibold">正确率：{percentage}%</span>
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-gray-600 mt-2">
                {gameState.correctAnswers} / {gameState.totalQuestions} 答对
              </div>
            </div>

            {gameState.maxCombo && gameState.maxCombo > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame className="w-6 h-6 text-orange-600" />
                  <span className="text-lg font-bold text-orange-700">
                    最大连击：{gameState.maxCombo} 连击！
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {gameState.maxCombo >= 5 ? '火力全开！太棒了！' :
                   gameState.maxCombo >= 3 ? '速度惊人！' :
                   '继续努力，挑战更高连击！'}
                </div>
              </div>
            )}

            {wrongAnswers.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <span className="text-lg font-bold text-red-700">
                    有 {wrongAnswers.length} 道错题需要复习
                  </span>
                </div>
                <Button
                  onClick={startReviewMode}
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  开始复习错题
                </Button>
              </div>
            )}

            <div className="mb-6">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-10 h-10 ${
                      star <= Math.ceil(percentage / 20)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 text-lg font-semibold text-gray-700">
                {percentage >= 90 ? '完美表现！' :
                 percentage >= 80 ? '非常优秀！' :
                 percentage >= 70 ? '做得不错！' :
                 percentage >= 60 ? '继续加油！' :
                 '需要多加练习'}
              </div>
            </div>
            <Button
              onClick={resetGame}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              重新开始
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (reviewMode && reviewFamilies.length > 0) {
    const reviewFamily = reviewFamilies[reviewIndex];
    const options = [reviewFamily.exercise.answer];
    const otherWords = wordFamilies
      .filter(w => w.root !== reviewFamily.root)
      .flatMap(w => [w.exercise.answer])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const allOptions = [...options, ...otherWords].sort(() => Math.random() - 0.5);

    const handleReviewAnswer = (answer: string) => {
      if (showResult) return;
      setSelectedAnswer(answer);
      setShowResult(true);
      const isCorrect = answer === reviewFamily.exercise.answer;
      if (isCorrect) {
        setShowPraise('记住了！');
        setTimeout(() => setShowPraise(null), 2000);
      }
    };

    const goToNextReview = () => {
      if (reviewIndex < reviewFamilies.length - 1) {
        setReviewIndex(reviewIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowExamples(false);
        setFlippedCard(null);
      } else {
        exitReviewMode();
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 shadow-lg border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="destructive" className="text-lg px-4 py-2">错题复习模式</Badge>
                <span className="text-gray-600">{reviewIndex + 1} / {reviewFamilies.length}</span>
              </div>
              <Button onClick={exitReviewMode} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                退出复习
              </Button>
            </div>
            <div className="mt-4">
              <Progress value={(reviewIndex + 1) / reviewFamilies.length * 100} className="h-2" />
            </div>
          </Card>

          {showPraise && (
            <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full shadow-2xl border-4 border-white">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✨</span>
                  <span className="text-2xl font-bold">{showPraise}</span>
                  <span className="text-3xl">✨</span>
                </div>
              </div>
            </div>
          )}

          <Card className="p-8 shadow-xl border-2 border-purple-200">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">{reviewFamily.root}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {Object.entries(reviewFamily.forms)
                .filter(([, form]) => form)
                .map(([formType, form]) => (
                <Card
                  key={formType}
                  className={`p-4 text-center cursor-pointer transition-all transform hover:scale-105 ${
                    flippedCard === formType
                      ? 'bg-purple-100 border-purple-400 shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setFlippedCard(flippedCard === formType ? null : formType)}
                >
                  <p className="text-sm text-gray-500 mb-1">{formType}</p>
                  <p className="text-lg font-bold text-gray-800">{form?.word}</p>
                  {flippedCard === formType && (
                    <div className="mt-2 text-sm text-purple-600">
                      <p>{form?.meaning}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={() => speakWord(reviewFamily.root)}
                variant="outline"
                className="border-purple-300 hover:bg-purple-50"
              >
                <Volume2 className="w-5 h-5 mr-2" />
                听发音
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4">请填写正确的词性形式：</h3>
              <div className="flex items-center justify-center gap-3 mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-purple-200">
                <p className="text-2xl font-bold text-purple-700 mb-2">{reviewFamily.exercise.sentence}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => speakWord(reviewFamily.exercise.sentence)}
                  className="flex-shrink-0 border-purple-300 hover:bg-purple-100 bg-white"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-lg text-gray-600 italic text-center mb-4">
                提示：{reviewFamily.exercise.hint}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {allOptions.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === reviewFamily.exercise.answer;
                  let buttonClass = 'border-2 h-14 text-lg font-semibold transition-all transform hover:scale-105 ';
                  if (!showResult) {
                    buttonClass += isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50';
                  } else if (isCorrectAnswer) {
                    buttonClass += 'border-green-500 bg-green-50 text-green-700';
                  } else if (isSelected) {
                    buttonClass += 'border-red-500 bg-red-50 text-red-700';
                  } else {
                    buttonClass += 'border-gray-200 bg-gray-50 opacity-50';
                  }

                  return (
                    <Button
                      key={index}
                      onClick={() => handleReviewAnswer(option)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option}</span>
                        {showResult && isCorrectAnswer && <CheckCircle className="w-6 h-6 text-green-600" />}
                        {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-6 h-6 text-red-600" />}
                      </div>
                    </Button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {selectedAnswer === reviewFamily.exercise.answer ? (
                      <><CheckCircle className="w-6 h-6 text-green-600" /><span className="text-lg font-bold text-green-700">回答正确！</span></>
                    ) : (
                      <><XCircle className="w-6 h-6 text-red-600" /><span className="text-lg font-bold text-red-700">回答错误</span></>
                    )}
                  </div>
                  <p className="text-gray-600 text-center">
                    正确答案是：<span className="font-bold text-purple-600">{reviewFamily.exercise.answer}</span>
                  </p>
                </div>
              )}
            </div>

            {showResult && (
              <div className="mt-6 text-center">
                <Button
                  onClick={goToNextReview}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {reviewIndex < reviewFamilies.length - 1 ? (
                    <>下一题 <ChevronRight className="w-5 h-5 ml-2" /></>
                  ) : (
                    <>完成复习 <Trophy className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 md:p-8">
      {selectedText && (
        <div
          className="selection-menu fixed z-50 bg-white shadow-xl rounded-lg border-2 border-purple-200 p-2 flex gap-2"
          style={{
            left: `${selectedText.x}px`,
            top: `${selectedText.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <Button size="sm" variant="outline" onClick={() => speakSelectedText(selectedText.text)} className="flex items-center gap-1 hover:bg-purple-50">
            <Volume2 className="w-4 h-4" />发音
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => translateText(selectedText.text)}
            disabled={isTranslating}
            className="flex items-center gap-1 hover:bg-blue-50"
          >
            {isTranslating ? <><Loader2 className="w-4 h-4 animate-spin" />翻译中...</> : <><Languages className="w-4 h-4" />翻译</>}
          </Button>
        </div>
      )}

      {showTranslation && translation && (
        <div
          className="fixed z-50 bg-gradient-to-r from-blue-50 to-purple-50 shadow-xl rounded-lg border-2 border-blue-200 p-4 max-w-md"
          style={{
            left: selectedText ? `${selectedText.x}px` : '50%',
            top: selectedText ? `${selectedText.y + 50}px` : '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-sm text-gray-600 mb-2">翻译：</div>
          <div className="text-lg font-medium text-gray-800">{translation}</div>
          <button onClick={() => setShowTranslation(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="p-6 shadow-lg border-2 border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-purple-100 text-purple-700">
                关卡 {gameState.currentLevel + 1} / {gameState.wordFamilies.length}
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2 border-2 border-blue-300">
                得分：<span className="font-bold text-blue-600">{gameState.score}</span>
              </Badge>
              {gameState.combo && gameState.combo > 0 && (
                <Badge variant="outline" className="text-lg px-4 py-2 border-2 border-orange-300 bg-orange-50">
                  <Flame className="w-4 h-4 text-orange-600 mr-1" />
                  <span className="font-bold text-orange-700">{gameState.combo} 连击</span>
                </Badge>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">进度：{Math.round(progress)}%</span>
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />每关自动保存
                </span>
              </div>
            </div>
            <Button onClick={resetGame} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />重置
            </Button>
          </div>
        </Card>

        {showPraise && (
          <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full shadow-2xl border-4 border-white">
              <div className="flex items-center gap-3">
                <span className="text-3xl">✨</span>
                <span className="text-2xl font-bold">{showPraise}</span>
                <span className="text-3xl">✨</span>
              </div>
            </div>
          </div>
        )}

        {showComboAnimation && gameState.combo && gameState.combo > 1 && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce"
            style={{ marginTop: showPraise ? '80px' : '0' }}
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-2xl border-4 border-yellow-300">
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8" />
                <span className="text-3xl font-bold">{gameState.combo} 连击!</span>
                <Zap className="w-8 h-8" />
              </div>
              {gameState.combo >= 3 && (
                <div className="text-center text-sm mt-1">+{gameState.combo * 2} 奖励分!</div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              词族：{currentFamily.root}
            </h2>

            <div className="space-y-4">
              {Object.entries(currentFamily.forms).map(([formType, form]) => (
                <div
                  key={formType}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    flippedCard === formType
                      ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-300'
                      : 'bg-white border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setFlippedCard(flippedCard === formType ? null : formType)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700">
                        {formType.toUpperCase()}
                      </Badge>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl font-semibold text-gray-800">{form?.word}</span>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => { e.stopPropagation(); if (form?.word) speakWord(form.word); }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); if (form?.word) speakWord(form.word); } }}
                          className="flex-shrink-0 p-1 rounded-full hover:bg-purple-100 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-5 h-5 text-purple-600" />
                        </span>
                      </div>
                      {form?.meaning && (
                        <p className="text-sm text-gray-600 italic">{form.meaning}</p>
                      )}
                    </div>
                    <ChevronRight className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-2 ${flippedCard === formType ? 'rotate-90' : ''}`} />
                  </div>

                  {flippedCard === formType && form?.example && (
                    <div className="mt-3 pt-3 border-t-2 border-purple-200">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-purple-600 font-semibold">中文释义：</span>
                        <p className="text-gray-700">{form.meaning || '-'}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 font-semibold">FCE例句：</span>
                        <p className="text-gray-700 italic">{form.example}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700">提示：点击每个词性可以查看中文释义和FCE例句，点击图标播放发音</p>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">练习题</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                <p className="text-lg text-gray-800 leading-relaxed flex-1">
                  {currentFamily.exercise.sentence.replace('___', '_________')}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => speakWord(currentFamily.exercise.sentence.replace('___', '[填空]'))}
                  className="flex-shrink-0 border-green-300 hover:bg-green-100 bg-white"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>

              {!showResult ? (
                <div className="grid grid-cols-1 gap-3">
                  {currentFamily.exercise.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      variant="outline"
                      className={`h-auto py-4 px-6 text-left text-lg border-2 transition-all duration-200 hover:border-purple-400 hover:bg-purple-50 ${
                        selectedAnswer === option ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-purple-600">{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                        </div>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => { e.stopPropagation(); speakWord(option); }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); speakWord(option); } }}
                          className="flex-shrink-0 p-1 rounded-full hover:bg-purple-100 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-5 h-5 text-purple-600" />
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentFamily.exercise.options.map((option, index) => {
                    const isCorrect = option === currentFamily.exercise.answer;
                    const isSelected = option === selectedAnswer;

                    let buttonClass = '';
                    let icon = null;

                    if (isSelected && isCorrect) {
                      buttonClass = 'bg-green-100 border-green-500 text-green-800';
                      icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                    } else if (isSelected && !isCorrect) {
                      buttonClass = 'bg-red-100 border-red-500 text-red-800';
                      icon = <XCircle className="w-5 h-5 text-red-600" />;
                    } else if (isCorrect) {
                      buttonClass = 'bg-green-50 border-green-400 text-green-700';
                      icon = <CheckCircle className="w-5 h-5 text-green-500" />;
                    }

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${buttonClass || 'bg-gray-50 border-gray-200'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-lg">
                              <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
                              {option}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={() => speakWord(option)}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') speakWord(option); }}
                              className="flex-shrink-0 p-1 rounded-full hover:bg-purple-100 transition-colors cursor-pointer"
                            >
                              <Volume2 className="w-5 h-5 text-purple-600" />
                            </span>
                            {icon}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <p className="text-gray-700">解析：{currentFamily.exercise.hint}</p>
                  </div>

                  <Button
                    onClick={nextLevel}
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-lg py-6"
                  >
                    下一题
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="flex justify-between gap-4">
          <Button onClick={previousLevel} variant="outline" size="lg" disabled={gameState.currentLevel === 0} className="flex-1">
            <ChevronLeft className="w-5 h-5 mr-2" />上一关
          </Button>
          <Button onClick={() => setShowExamples(!showExamples)} variant="outline" size="lg" className="flex-1">
            {showExamples ? '隐藏例句' : '显示例句'}
          </Button>
          <Button onClick={nextLevel} variant="outline" size="lg" disabled={gameState.currentLevel === gameState.wordFamilies.length - 1} className="flex-1">
            下一关<ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
