import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';

// 개발 중에는 로컬 서버 사용
const WEB_URL = __DEV__
  ? Platform.select({
      ios: 'http://localhost:5173',
      android: 'http://10.0.2.2:5173', // Android 에뮬레이터용
      default: 'http://localhost:5173',
    })!
  : 'https://your-deployed-url.com'; // 프로덕션에서는 배포된 URL

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 오디오 권한 요청
  useEffect(() => {
    async function requestPermissions() {
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      } catch (err) {
        console.error('Failed to get permissions:', err);
      }
    }
    requestPermissions();
  }, []);

  // 녹음 시작
  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);

      // WebView에 녹음 시작 알림
      sendToWebView('RECORDING_START', {});
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  // 녹음 중지
  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      console.log('Recording saved to:', uri);

      // TODO: 여기서 음성을 STT API로 보내서 텍스트 변환
      // 지금은 테스트용으로 더미 텍스트 전송
      const dummyText = Math.random() > 0.5 ? '안녕! 반가워!' : '오늘 좀 피곤해...';

      // WebView에 결과 전송
      sendToWebView('VOICE_RESULT', { text: dummyText });
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };

  // WebView로 메시지 전송
  const sendToWebView = (type: string, payload: object) => {
    if (webViewRef.current) {
      const message = JSON.stringify({ type, payload });
      webViewRef.current.postMessage(message);
    }
  };

  // WebView에서 오는 메시지 처리
  const handleWebViewMessage = (event: { nativeEvent: { data: string } }) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('Received from WebView:', message);

      // 필요시 처리
    } catch (e) {
      console.error('Failed to parse WebView message:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* WebView - 3D 씬 */}
      <View style={styles.webviewContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#87CEEB" />
            <Text style={styles.loadingText}>로딩 중...</Text>
          </View>
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: WEB_URL }}
          style={styles.webview}
          onLoadEnd={() => setIsLoading(false)}
          onMessage={handleWebViewMessage}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState={false}
          originWhitelist={['*']}
        />
      </View>

      {/* 하단 컨트롤 영역 */}
      <View style={styles.controlsContainer}>
        {/* 음성 녹음 버튼 */}
        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording && styles.recordButtonActive,
          ]}
          onPressIn={startRecording}
          onPressOut={stopRecording}
          activeOpacity={0.8}
        >
          <Text style={styles.recordButtonIcon}>
            {isRecording ? '🔴' : '🎤'}
          </Text>
          <Text style={styles.recordButtonText}>
            {isRecording ? '말하는 중...' : '꾹 눌러서 말하기'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webviewContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87CEEB',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 10,
  },
  recordButtonActive: {
    backgroundColor: '#FF6B6B',
    transform: [{ scale: 1.02 }],
  },
  recordButtonIcon: {
    fontSize: 24,
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
