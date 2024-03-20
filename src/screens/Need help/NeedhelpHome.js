import {
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, FONTS, FONT_FAMILY, WEIGHT} from '../../theme/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import Tts from 'react-native-tts';
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const MODEL_NAME = 'gemini-1.0-pro';
const API_KEY = '';

const NeedhelpHome = () => {
  const currentTextRef = useRef();
  useEffect(() => {
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {
      setIsSpeaking(false);
      console.log('finish', event);
    });
    Tts.addEventListener('tts-cancel', event => {
      console.log('cancel', event);
      setIsSpeaking(false);
    });
  }, []);

  const [messages, setMessages] = useState([
    {
      role: 'model',
      parts: [{text: 'Hello! How can I help you?'}],
    },
  ]);

  async function runChat(searchQuery) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [{text: 'suggest any place for vacation for this summer'}],
        },
        {
          role: 'model',
          parts: [
            {
              text: '**Domestic Destinations:**\n\n* **National Parks:** Yosemite National Park (California), Acadia National Park (Maine), Grand Canyon National Park (Arizona)\n* **Beaches:** Waikiki Beach (Hawaii), Myrtle Beach (South Carolina), Outer Banks (North Carolina)\n* **Mountains:** Aspen (Colorado), Jackson Hole (Wyoming), Blue Ridge Mountains (Virginia)\n* **Cities:** New York City, Chicago, Las Vegas\n* **Theme Parks:** Disneyland (California), Walt Disney World (Florida), Universal Orlando Resort (Florida)\n\n**International Destinations:**\n\n* **Europe:** Paris (France), Rome (Italy), Barcelona (Spain), London (England), Athens (Greece)\n* **Caribbean:** Jamaica, Barbados, Turks and Caicos, Puerto Rico, Dominican Republic\n* **Mexico:** Cancun, Riviera Maya, Los Cabos, Puerto Vallarta\n* **Canada:** Banff (Alberta), Niagara Falls (Ontario), Whistler (British Columbia)\n* **Asia:** Tokyo (Japan), Hong Kong (China), Bangkok (Thailand), Singapore, Bali (Indonesia)\n\n**Considerations:**\n\n* **Interests:** Nature, history, culture, adventure, relaxation\n* **Budget:** Accommodation, transportation, food, activities\n* **Time of Year:** Peak season vs. off-season\n* **Travel Style:** Independent travel, guided tours, all-inclusive resorts\n* **Health and Safety:** Check travel advisories and vaccination requirements',
            },
          ],
        },
      ],
    });
    setMessages([
      ...messages,
      {
        role: 'user',
        parts: [{text: searchQuery}],
      },
    ]);
    const result = await chat.sendMessage(searchQuery);
    const response = result.response;
    console.log(response.text());
    setIsSpeaking(true);
    Tts.speak(response.text());
    setMessages([
      ...messages,
      {
        role: 'user',
        parts: [{text: searchQuery}],
      },
      {
        role: 'model',
        parts: [{text: response.text().toString().replace('*', ' ')}],
      },
    ]);
    currentTextRef?.current?.scrollToEnd({animated: true});
  }
  const onSendHandler = () => {
    if (searchQuery.length > 0) {
      setSearchQuery('');
      runChat(searchQuery);
    }

    // console.log(JSON.stringify(messages));
  };

  const [isSpeaking, setIsSpeaking] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
      <Image
        source={require('../../assets/image/assistant.png')}
        style={{
          resizeMode: 'contain',
          width: '35%',
          height: '20%',
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          flex: 1,
          borderRadius: 7,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: COLORS.primaryBorderColor,
        }}>
        <FlatList
          data={messages}
          style={{
            flex: 1,
            backgroundColor: COLORS.whiteColor,
            marginBottom: 17.5,
            borderWidth: 1,
            borderColor: COLORS.primaryBorderColor,
          }}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 10, marginBottom: 17.5}}
          renderItem={({item, index}) => {
            let isAssistant = item?.role == 'model';
            let lastIndex = messages.length - 1;
            return (
              <View
                ref={currentTextRef}
                style={{
                  alignItems: isAssistant ? 'flex-start' : 'flex-end',
                  marginLeft: isAssistant ? 15 : 0,
                  marginTop: index == 0 ? 7.5 : 0,
                  width: isAssistant ? '85%' : '96%',
                  marginBottom: lastIndex == index ? 35 : 0,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    color: isAssistant ? COLORS.blackColor : COLORS.whiteColor,
                    borderRadius: 7,
                    borderTopLeftRadius: isAssistant ? 0 : 7,
                    borderTopRightRadius: isAssistant ? 7 : 0,
                    backgroundColor: isAssistant
                      ? COLORS.blueColorBlur
                      : '#006400',
                    fontSize: FONTS.extraInfo,
                    fontWeight: WEIGHT.extraInfo,
                    fontFamily: FONT_FAMILY.regular,
                  }}>
                  {item?.parts[0]?.text}
                </Text>
              </View>
            );
          }}
        />
        <View
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            backgroundColor: COLORS.primaryBorderColor,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Enter Your Query"
            style={{flex: 1, padding: 10}}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity activeOpacity={0.35} onPress={onSendHandler}>
            <FontAwesomeIcon
              name="send"
              size={24}
              color={COLORS.primaryColor}
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* buttons  */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 5,
        }}>
        {!isSpeaking ? (
          <View />
        ) : (
          <TouchableOpacity
            activeOpacity={0.35}
            onPress={() => {
              Tts.stop();
              setIsSpeaking(false);
            }}>
            <FontAwesomeIcon
              name="stop-circle"
              size={50}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
        )}
        {isSpeaking ? (
          <LottieView
            source={require('../../animation/recording.json')}
            style={{width: 65, height: 60}}
            autoPlay={true}
            loop={true}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.35}
            onPress={() => setIsSpeaking(true)}>
            <FontAwesomeIcon
              name="microphone"
              size={50}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
        )}
        {!messages.length > 0 ? (
          <View />
        ) : (
          <TouchableOpacity
            activeOpacity={0.35}
            onPress={() => setMessages([])}>
            <MaterialCommunityIcons
              name="chat-minus"
              size={50}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NeedhelpHome;
