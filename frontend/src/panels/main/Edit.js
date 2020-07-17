import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
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

const Edit = ({
  id,
  token,
  food,
  isLoading,
  goBack,
  foodUpdate,
  setPopout,
}) => {
  const userFood = {
    title: food.title,
    duration_days: food.duration_days,
    description: food.description,
    image: food.image,
  };
  const [image, setImage] = useState(null);
  const [editedFood, setEditedFood] = useState({
    title: food.title,
    duration_days: food.duration_days,
    description: food.description,
    image: food.image,
  });
  const [isValid, setIsValid] = useState(true);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!isLoading && isValid && isSent) {
      setPopout(null);
      goBack();
    }
  }, [isLoading, isValid, isSent, setPopout, goBack]);

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setEditedFood({ ...editedFood, [name]: value });
  };

  const editFood = () => {
    const valid = !Object.values(editedFood).some((x) => x === null);
    setIsValid(valid);
    if (
      token &&
      valid &&
      JSON.stringify(editedFood) !== JSON.stringify(userFood)
    ) {
      const data = new FormData();
      Object.keys(editedFood).forEach((key) =>
        data.append(key, editedFood[key])
      );
      if (!image) {
        data.delete("image");
      }
      foodUpdate(token, food.id, data);
      setIsSent(true);
      setPopout(<ScreenSpinner />);
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setEditedFood({ ...editedFood, image: file });
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
            src={image ? image : editedFood.image}
            alt="Product Preview"
          />
        </div>
      </CardGrid>
    );
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>
        Изменить
      </PanelHeader>
      {editedFood.image && addImage()}
      <FormLayout>
        <File
          mode="secondary"
          before={!editedFood.image ? <Icon24AddOutline /> : <Icon24Write />}
          controlSize="xl"
          onChange={uploadImage}
        >
          {!editedFood.image ? "Добавить фото" : "Изменить фото"}
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
          value={editedFood.title}
        />

        <Select
          top="Срок размещения"
          placeholder="Кол-во дней"
          name="duration_days"
          onChange={onChange}
          value={editedFood.duration_days}
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
          value={editedFood.description}
          onChange={onChange}
        />

        <Button onClick={editFood} size="xl">
          Редактировать
        </Button>
      </FormLayout>
    </Panel>
  );
};

Edit.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string,
  food: PropTypes.object,
  isLoading: PropTypes.bool,
  goBack: PropTypes.func.isRequired,
  foodUpdate: PropTypes.func,
  setPopout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  isLoading: state.food.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    foodUpdate: (token, id, food) =>
      dispatch(actions.foodUpdate(token, id, food)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
