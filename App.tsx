import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';
import { testSchema, TtestSchema } from './src/models/schemas/test.schema';

function App() {
  const { control, handleSubmit } = useForm<TtestSchema>({
    resolver: zodResolver(testSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="ชื่อ"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
              />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="อีเมล"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                keyboardType="email-address"
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={{ marginTop: 20 }}
          >
            ส่งข้อมูล
          </Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
