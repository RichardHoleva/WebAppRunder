import OnBoardingSlider from '../components/OnBoardingSlider.jsx';
import FirstImageOB from '../assets/FirstPageImage.png';
import OnBoardingOne from '../assets/onboarding1.png';
import SecondImageOB from '../assets/SecondPageImage.png';
import OnBoardingTwo from '../assets/onboarding2.png';
import ThirdImageOB from '../assets/ThirdPageImage.png';
import OnBoardingThree from '../assets/onboarding3.png';



export default function OnBoarding() {
  const slides = [
    {
      backgroundImage: FirstImageOB,
      overlayImage: OnBoardingOne,
      title: 'Start right away',
      description: '' 
    },
    {
      backgroundImage: SecondImageOB,
      overlayImage: OnBoardingTwo,
      title: 'Track your progress',
    },
    {
      backgroundImage: ThirdImageOB,
      overlayImage: OnBoardingThree,
      title: 'Join the community',
    }
  ];

  return <OnBoardingSlider slides={slides} />;
}