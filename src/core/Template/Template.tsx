import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaDatabase, FaSyringe } from "react-icons/fa";
import {
  MdDashboard,
  MdExpandMore,
  MdMenu,
  MdPerson,
  MdAirlineSeatFlat,
} from "react-icons/md";
import Button from "../Button/Button";
import SidebarButton from "../SidebarButton/SidebarButton";
import Sidebar from "../SidebarDropdown/SidebarDropdown";
import "./template.scss";

interface Props {}

const Template: React.FC<Props> = ({ children }) => {
  const [sidenav, setSidenav] = useState(false);
  const [pasienOpen, setPasienOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin/pasien/pasienMasuk") {
      setActive("pasienMasuk");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/pasien/pasienKomorbid") {
      setActive("pasienKomorbid");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/pasien/pasienNonKomorbid") {
      setActive("pasienNonKomorbid");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/pasien/pasienKeluar") {
      setActive("pasienKeluar");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/pasien/pasienTriase") {
      setActive("pasienTriase");
      setPasienOpen(true);
    }
    if (location.pathname === "/admin/ruangan") {
      setActive("ruangan");
    }
    if (location.pathname === "/admin/sdm") {
      setActive("sdm");
    }
    if (location.pathname === "/admin/apd") {
      setActive("apd");
    }
    if (location.pathname === "/admin/oksigen") {
      setActive("oksigen");
    }
  }, [location.pathname]);
  return (
    <div className="template--container">
      <div
        className={sidenav ? "template--sidenav" : ""}
        id="sidenav-container"
        onClick={(e: any) => {
          if (e.target.id === "sidenav-container") {
            setSidenav(!sidenav);
          }
        }}
      >
        {/* GANTI WARNA SIDEBAR */}
        <div
          className={`template--sidenav-container ${
            sidenav ? "template--sidenav-active" : "template--sidenav-close"
          }`}
        >
          <div className="template--sidenav-brand">SIRS RSSK</div>
          <div className="template--sidenav-main">
            {/* PASIEN NAVIGATION */}
            <Sidebar.Dropdown
              onClick={setPasienOpen}
              open={pasienOpen}
              setSidenav={setSidenav}
            >
              <Sidebar.Button>
                <MdPerson style={{ marginRight: "1.6rem" }} />
                Pasien
                <MdExpandMore style={{ marginLeft: "auto" }} />
              </Sidebar.Button>
              <Sidebar.Container>
                <Sidebar.Link
                  active={active === "pasienMasuk" ? true : false}
                  href="/admin/pasien/pasienMasuk"
                >
                  Pasien Masuk
                </Sidebar.Link>
                <Sidebar.Link
                  active={active === "pasienKomorbid" ? true : false}
                  href="/admin/pasien/pasienKomorbid"
                >
                  Pasien Komorbid
                </Sidebar.Link>
                <Sidebar.Link
                  active={active === "pasienNonKomorbid" ? true : false}
                  href="/admin/pasien/pasienNonKomorbid"
                >
                  Pasien Tanpa Komorbid
                </Sidebar.Link>
                <Sidebar.Link
                  active={active === "pasienKeluar" ? true : false}
                  href="/admin/pasien/pasienKeluar"
                >
                  Pasien Keluar
                </Sidebar.Link>
                <Sidebar.Link
                  active={active === "pasienTriase" ? true : false}
                  href="/admin/pasien/pasienTriase"
                >
                  Pasien IGD Triase
                </Sidebar.Link>
              </Sidebar.Container>
            </Sidebar.Dropdown>

            <SidebarButton
              href="/admin/ruangan"
              active={active === "ruangan" ? true : false}
            >
              <MdAirlineSeatFlat style={{ marginRight: "1.6rem" }} />
              Ruangan
            </SidebarButton>
            <SidebarButton
              href="/admin/sdm"
              active={active === "sdm" ? true : false}
            >
              <MdPerson style={{ marginRight: "1.6rem" }} />
              SDM
            </SidebarButton>
            <SidebarButton
              href="/admin/apd"
              active={active === "apd" ? true : false}
            >
              <FaSyringe style={{ marginRight: "1.6rem" }} />
              APD
            </SidebarButton>
            <SidebarButton
              href="/admin/oksigen"
              active={active === "oksigen" ? true : false}
            >
              <FaDatabase style={{ marginRight: "1.6rem" }} />
              Oksigen
            </SidebarButton>
          </div>
        </div>
      </div>
      <div className="template--toggle-container">
        <Button
          className="template--toggle-button"
          onClick={setSidenav.bind(this, true)}
        >
          <MdMenu />
        </Button>
      </div>
      <div className="template--main">
        <div className="template--main-mixin"></div>
        <div className="template--content-container">
          <div>{children}</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Template;
