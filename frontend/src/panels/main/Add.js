import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  View,
  Panel,
  PanelHeader,
  CardGrid,
  FormLayout,
  FormStatus,
  Input,
  Select,
  Textarea,
  File,
  Button,
  ScreenSpinner,
} from "@vkontakte/vkui";
import * as actions from "../../store/actions/food";
import Icon24AddOutline from "@vkontakte/icons/dist/24/add_outline";
import Icon24Write from "@vkontakte/icons/dist/24/write";

const Add = ({ id, token, isLoading, setActiveStory, foodCreate }) => {
  const [popout, setPopout] = useState(null);
  const [image, setImage] = useState(null);
  const [food, setFood] = useState({
    title: null,
    duration_days: null,
    description: "",
    image: null,
  });
  const [isValid, setIsValid] = useState(true);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!isLoading && isValid && isSent) {
      setPopout(null);
      setActiveStory("home");
    }
  }, [isLoading, isValid, isSent, setActiveStory]);

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setFood({ ...food, [name]: value });
  };

  const submitFood = () => {
    const valid = !Object.values(food).some((x) => x === null);
    setIsValid(valid);
    if (token && valid) {
      const data = new FormData();
      Object.keys(food).forEach((key) => data.append(key, food[key]));
      foodCreate(token, data);
      setIsSent(true);
      setPopout(<ScreenSpinner />);
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFood({ ...food, image: file });
    setImage(URL.createObjectURL(file));
  };

  const addImage = () => {
    return (
      <CardGrid>
        <div className="Add__Preview">
          <img
            style={{
              height: 193,
              width: "auto",
              display: "block",
              margin: "0 auto",
            }}
            src={image}
            alt="Product Preview"
          />
        </div>
      </CardGrid>
    );
  };

  return (
    <View id={id} activePanel={id} popout={popout}>
      <Panel id={id}>
        <PanelHeader>Создать</PanelHeader>
        {image && addImage()}
        <FormLayout>
          <File
            mode="secondary"
            before={!image ? <Icon24AddOutline /> : <Icon24Write />}
            controlSize="xl"
            onChange={uploadImage}
            accept="image/jpeg,image/png"
          >
            {!image ? "Добавить фото" : "Изменить фото"}
          </File>
          {!isValid && (
            <FormStatus header="Обязательные поля" mode="error">
              Необходимо корректно ввести все поля формы
            </FormStatus>
          )}

          <Input
            top="Название продукта"
            placeholder="Пельмени"
            name="title"
            onChange={onChange}
          />

          <Select
            top="Срок размещения"
            placeholder="Кол-во дней"
            name="duration_days"
            onChange={onChange}
          >
            <option value="1">1 день</option>
            <option value="2">2 дня</option>
            <option value="3">3 дня</option>
            <option value="4">4 дня</option>
            <option value="5">5 дней</option>
            <option value="6">6 дней</option>
            <option value="7">Неделя</option>
            <option value="14">Две недели</option>
          </Select>

          <Textarea
            top="Необязательно"
            placeholder="Любимые пельмени моей бабушки. Отдаю нуждающимся."
            name="description"
            onChange={onChange}
          />
          <Button onClick={() => submitFood()} size="xl">
            Опубликовать
          </Button>
        </FormLayout>
      </Panel>
    </View>
  );
};

Add.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
  setActiveStory: PropTypes.func,
  foodCreate: PropTypes.func,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  isLoading: state.food.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    foodCreate: (token, food) => dispatch(actions.foodCreate(token, food)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
