import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
export default function Diary() {
  const [diaryText, setDiaryText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [music, setMusic] = useState({title: '', artist: '', img: ''});
  const [errorMessage, setErrorMessage] = useState('');

  const SERVER_URL = 'http:///172.16.98.112:5001';

  // 감정 분석 API 호출
  const analyzeDiary = async () => {
    setErrorMessage(''); // 오류 메시지 초기화
    try {
      const response = await fetch(`${SERVER_URL}/process-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: diaryText}),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const data = await response.json();
      setAnalysisResult(data);

      console.log('분석 결과:', data); // 결과 출력

      // 음악 리스트에서 랜덤 트랙 가져오기
      if (data.music && data.music.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.music.length); // 0~(data.music.length-1)
        const track = data.music[randomIndex]; // 랜덤으로 선택된 트랙
        setMusic({
          title: track.title,
          artist: track.artist,
          img: track.image,
        });
        console.log('추천 음악:', track); // 음악 정보 출력
      } else {
        setMusic({title: '', artist: '', img: ''});
      }
    } catch (error) {
      console.error('일기 분석 오류:', error);
      setErrorMessage('일기 분석 중 오류가 발생했습니다.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>일기</Text>
      <TextInput
        style={styles.textInput}
        placeholder="오늘 하루는 어땠나요? 당신의 하루를 작성하세요 :)"
        value={diaryText}
        onChangeText={setDiaryText}
        multiline
        numberOfLines={4} // 적당한 줄 수로 설정
      />
      <TouchableOpacity style={styles.resultButton} onPress={analyzeDiary}>
        <Text style={styles.buttonText}>감정 확인하기</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      {analysisResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>감정 분석 결과</Text>
          <Text style={styles.result}>{analysisResult.emotion}</Text>
          <Text style={styles.result}>
            행복 수치 : {analysisResult.sentiment.label}
          </Text>
        </View>
      )}

      {music.title && (
        <View style={styles.musicContainer}>
          <Text style={styles.musicTitle}>추천 음악</Text>
          <Text style={styles.result}>
            {music.title} - {music.artist}
          </Text>
          {music.img ? (
            <Image style={styles.musicImage} source={{uri: music.img}} />
          ) : (
            <Text>추천 음악 이미지 없음</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
