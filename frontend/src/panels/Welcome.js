import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import {
  View,
  Panel,
  ModalRoot,
  ModalCard,
  PanelHeader,
  Button,
  Group,
  Div,
  Gallery,
  Header,
  Text,
  Link,
  ModalPageHeader,
  Spinner,
  Placeholder,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import * as actions from "../store/actions/user";

import pizza from "../img/pizza.png";
import person from "../img/person.png";
import home from "../img/home.png";

const Welcome = ({ setFirstLaunch, scheme, queryParams, userCreate }) => {
  const [galleryPage, setGalleryPage] = useState(0);
  const [geoLocation, setGeoLocation] = useState({
    lat: null,
    long: null,
    firstEntry: false,
    currentGeo: {},
    coordinates: null,
  });
  const [geoAvailable, setGeoAvailable] = useState(true);
  const [geoModal, setGeoModal] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [vkUser, setVkUser] = useState();

  useEffect(() => {
    if (galleryPage === 2) {
      bridge
        .send("VKWebAppGetUserInfo")
        .then((data) => {
          setVkUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [galleryPage]);

  const openModal = () => {
    bridge
      .send("VKWebAppGetGeodata")
      .then((data) => {
        // Обработка события в случае успеха
        if (data.available) {
          setGeoLocation({
            lat: data.lat,
            long: data.long,
            firstEntry: false,
            currentGeo: {
              center: [data.lat, data.long],
              zoom: 15,
            },
            coordinates: [[data.lat, data.long]],
          });
        } else {
          setGeoAvailable(false);
        }
      })
      .catch((error) => {
        console.log(error);
        // Обработка события в случае ошибки
      });
    setGeoModal("geo");
  };

  const createUser = () => {
    if (vkUser) {
      const user = {
        vk_id: vkUser.id,
        first_name: vkUser.first_name,
        last_name: vkUser.last_name,
        avatar_url: vkUser.photo_max_orig,
        query_params: queryParams,
      };
      if (geoLocation && geoLocation.coordinates) {
        const geo = {
          type: "Point",
          coordinates: geoLocation.currentGeo.center,
        };
        user.location_coordinates = geo;
      }
      localStorage.setItem("alreadyLaunched", true);
      userCreate(user);
      setFirstLaunch(false);
    }
  };

  const modal = (
    <ModalRoot activeModal={geoModal}>
      <ModalCard
        id="geo"
        onClose={() => setGeoModal(null)}
        header={<ModalPageHeader>Ты на карте</ModalPageHeader>}
      >
        {!mapVisible && geoAvailable && (
          <div className="Welcome__Spinner_loading">
            <Spinner size="large" />
          </div>
        )}
        {!geoAvailable && (
          <Placeholder>
            К сожалению, мы не смогли определить вашу геопозицию, но вы всегда
            можете изменить ее в настройках.
          </Placeholder>
        )}
        {geoLocation.coordinates && (
          <YMaps>
            <div style={{ marginTop: 20, marginBottom: 12 }}>
              <Map
                width="100%"
                defaultState={geoLocation.currentGeo}
                instanceRef={(ref) => {
                  ref && ref.behaviors.disable("drag") && setMapVisible(true);
                }}
              >
                {geoLocation.coordinates.map((coordinate) => (
                  <Placemark key={coordinate} geometry={coordinate} />
                ))}
              </Map>
            </div>
          </YMaps>
        )}
        <Button
          size="l"
          stretched
          onClick={createUser}
          style={{ padding: "4px 0px" }}
        >
          Сохранить
        </Button>
        <div className="ModalCard__caption" style={{ marginTop: 12 }}>
          Нажимая на “Сохранить”, Вы принимаете{" "}
          <Link href="https://vk.com/@eda_darom_app-publichnoe-soglashenie">
            пользовательское соглашение
          </Link>{" "}
          данного приложения
        </div>
      </ModalCard>
    </ModalRoot>
  );

  const FirstSlide = () => (
    <Panel id="welcome" centered>
      <div className="Welcome__Icon">
        <img src={pizza} alt="Pizza Icon" />
      </div>
      <Text weight="regular" className="Welcome__Text" style={{ width: "75%" }}>
        Ежегодно в мире выбрасывается около 884 млн тонн еды...
      </Text>
    </Panel>
  );

  const SecondSlide = () => (
    <Panel id="welcome" centered>
      <div className="Welcome__Icon">
        <img src={person} alt="Soup Icon" />
      </div>
      <Text weight="regular" className="Welcome__Text" style={{ width: "70%" }}>
        Но зачем выбрасывать, если можно ее кому-нибудь отдать?
      </Text>
    </Panel>
  );

  const ThirdSlide = () => (
    <Panel id="welcome" centered>
      <div className="Welcome__Icon">
        <img src={home} alt="Location Icon" />
      </div>
      <Text weight="regular" className="Welcome__Text" style={{ width: "75%" }}>
        Обменивайся лишней едой с теми, кто живет неподалеку.
      </Text>
    </Panel>
  );

  const renderButton = (page) => {
    switch (page) {
      case 0:
        return (
          <Button
            size="l"
            stretched
            className="Welcome__Button"
            onClick={() => setGalleryPage(1)}
          >
            Это ужасно!
          </Button>
        );
      case 1:
        return (
          <Button
            size="l"
            stretched
            className="Welcome__Button"
            onClick={() => setGalleryPage(2)}
          >
            Действительно
          </Button>
        );
      case 2:
        return (
          <Button
            size="l"
            stretched
            mode="commerce"
            className="Welcome__Button"
            onClick={openModal}
          >
            Определить локацию
          </Button>
        );
      default:
        return (
          <Button size="l" stretched>
            Согласен!
          </Button>
        );
    }
  };
  return (
    <View activePanel="welcome" modal={modal}>
      <Panel id="welcome">
        <PanelHeader>Еда даром</PanelHeader>

        <Group header={<Header mode="secondary"></Header>}>
          <Gallery
            slideWidth="100%"
            className="Welcome__Gallery"
            bullets={scheme === "space_gray" ? "light" : "dark"}
            onChange={(number) => setGalleryPage(number)}
            slideIndex={galleryPage}
          >
            <FirstSlide />
            <SecondSlide />
            <ThirdSlide />
          </Gallery>
        </Group>

        <Div style={{ display: "flex", marginTop: 15 }}>
          {renderButton(galleryPage)}
        </Div>
      </Panel>
    </View>
  );
};

Welcome.propTypes = {
  setFirstLaunch: PropTypes.func.isRequired,
  queryParams: PropTypes.string,
  userCreate: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    userCreate: (user) => dispatch(actions.userCreate(user)),
  };
};

export default connect(null, mapDispatchToProps)(Welcome);
