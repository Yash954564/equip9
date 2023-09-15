import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { S3 } from 'aws-sdk';

const UploadProfilePicScreen = ({ navigation }) => {
  const [profilePic, setProfilePic] = useState(null);

  const handleImageSelect = (imageUri) => {
    setProfilePic(imageUri);
  };

  const handleNext = async () => {
    if (!profilePic) {
      Alert.alert('Error', 'Please select a profile picture.');
      return;
    }

    // Configure AWS SDK
    const s3 = new S3({
      accessKeyId: 'AKIA3KZVK3RM6V72UAHV',
      secretAccessKey: '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',
      region: 'ap-south-1',
    });

    // Define S3 bucket and object key
    const bucketName = 'equip9-testing';
    const objectKey = 'profile-pics/' + Date.now() + '.jpg'; // Unique key for each image

    // Prepare parameters for S3 upload
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: profilePic, // The image data
      ContentType: 'image/jpeg',
      ACL: 'public-read', // Set the ACL to make the object publicly accessible
    };

    try {
      // Upload the image to S3
      await s3.upload(params).promise();
      console.log('Image uploaded successfully.');

      // Redirect to Screen 2 or any other action
      navigation.navigate('CalculateDistanceScreen', { profilePic });
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      Alert.alert('Error', 'Failed to upload profile picture.');
      navigation.navigate('CalculateDistanceScreen', { profilePic });
    }
  };

  return (
    <View>
      <ImagePickerComponent onImageSelect={handleImageSelect} />
      <Button title="Next" onPress={handleNext} disabled={!profilePic} />
    </View>
  );
};

export default UploadProfilePicScreen;
