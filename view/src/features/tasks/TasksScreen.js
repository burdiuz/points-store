import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-native';
import { useFormik } from 'formik';
import { View } from 'react-native';
import {
  Input,
  Button,
  Select,
  SelectItem,
  Toggle,
  Text,
  ButtonGroup,
} from 'react-native-elements';
import { TaskType } from '../../utils';

const TYPES = [TaskType.earn, TaskType.spend, TaskType.fine];
const TYPE_TITLES = [
  'Earn Points Task',
  'Spend Points Action',
  'Fine / Penalty',
];

export const TasksScreen = () => {
  const [typePath, setTypePath] = useState(new IndexPath(0));
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      duration: '',
      amount: '',
      type: `${typePath.row}`,
      active: '1',
    },
    onSubmit: async ({
      title,
      description,
      duration,
      amount,
      type,
      active,
    }) => {
      // await dispatch(createUser(title, description, TYPES[type], !!active));

      history.goBack();
    },
  });

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Input
        label="Action Name"
        style={{ marginBottom: 20 }}
        value={formik.values.title}
        onChangeText={formik.handleChange('title')}
        onBlur={formik.handleBlur('title')}
      />
      <Input
        multiline={true}
        textStyle={{ minHeight: 64 }}
        label="Description"
        style={{ marginBottom: 20 }}
        value={formik.values.description}
        onChangeText={formik.handleChange('description')}
        onBlur={formik.handleBlur('description')}
      />
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          alignItems: 'flex-end',
        }}>
        <Input
          label="Points Amount"
          style={{ flex: 1 }}
          value={formik.values.amount}
          onChangeText={formik.handleChange('amount')}
          onBlur={formik.handleBlur('amount')}
        />
        <ButtonGroup
          appearance="outline"
          size="small"
          style={{ marginBottom: 5, marginLeft: 5, height: 38 }}>
          <Button onPress={() => formik.setFieldValue('amount', 5)}>5</Button>
          <Button onPress={() => formik.setFieldValue('amount', 10)}>10</Button>
          <Button onPress={() => formik.setFieldValue('amount', 15)}>15</Button>
          <Button onPress={() => formik.setFieldValue('amount', 20)}>20</Button>
          <Button onPress={() => formik.setFieldValue('amount', 30)}>30</Button>
          <Button onPress={() => formik.setFieldValue('amount', 50)}>50</Button>
          <Button onPress={() => formik.setFieldValue('amount', 100)}>
            100
          </Button>
        </ButtonGroup>
      </View>
      <Select
        label="Action Type"
        style={{ marginBottom: 20 }}
        selectedIndex={typePath}
        value={TYPE_TITLES[typePath.row]}
        onSelect={(indexPath) => {
          formik.setFieldValue('type', `${indexPath.row}`);
          setTypePath(indexPath);
        }}>
        {TYPE_TITLES.map((title) => (
          <SelectItem key={title} title={title} />
        ))}
      </Select>
      <Input
        label="Duration"
        placeholder="duration value in minutes"
        value={formik.values.duration}
        onChangeText={formik.handleChange('duration')}
        onBlur={formik.handleBlur('duration')}
      />
      <ButtonGroup
        appearance="outline"
        size="small"
        style={{ marginBottom: 20, alignSelf: 'flex-end' }}>
        <Button onPress={() => formik.setFieldValue('duration', 15)}>
          15 mins
        </Button>
        <Button onPress={() => formik.setFieldValue('duration', 30)}>
          30 mins
        </Button>
        <Button onPress={() => formik.setFieldValue('duration', 60)}>
          hour
        </Button>
        <Button onPress={() => formik.setFieldValue('duration', 120)}>
          2 hrs
        </Button>
        <Button onPress={() => formik.setFieldValue('duration', 240)}>
          4 hrs
        </Button>
        <Button onPress={() => formik.setFieldValue('duration', 480)}>
          8 hrs
        </Button>
        <Button onPress={() => formik.setFieldValue('duration', 1440)}>
          day
        </Button>
        <Button onPress={() => formik.setFieldValue('duration', 10080)}>
          week
        </Button>
      </ButtonGroup>
      <View style={{ flexDirection: 'row' }}>
        <Toggle
          style={{ marginRight: 10 }}
          checked={!!formik.values.active}
          onChange={(value) => {
            formik.setFieldValue('active', value ? '1' : '');
          }}
        />
        <Text appearance="hint">Active</Text>
      </View>
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Button appearance="outline" style={{ flex: 1, marginRight: 20 }}>
          SHOW ALL USERS
        </Button>
        <Button style={{ flex: 1 }}>ADD USER</Button>
      </View>
    </View>
  );
};
