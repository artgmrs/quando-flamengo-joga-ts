import { useState } from "react";
import getNextGame from "../../services/ApiService.ts";
import { useEffect } from "react";
import { formatDate, formatTime } from "../../utils/DateUtils.ts";
import { generateGoogleCalendarLink } from "../../utils/GoogleCalendarUtils.ts";
import ClipLoader from "react-spinners/ClipLoader";
import "./GameInfo.css";
import { GameProp } from "../../types/GameProp.ts";

function Mandante(dados: GameProp) {
  if (dados.mandante) {
    return (
      <div className="box-teams">
        <div className="team-principal">
          <img src={"/flamengo_escudo.png"}></img>
          <h4>Flamengo</h4>
        </div>
        <div className="team-secondary">
          <img src={dados?.imagemRival}></img>
          <h4>{dados?.nomeRival}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="box-teams">
        <div className="team-principal">
          <img src={dados?.imagemRival}></img>
          <h4>{dados?.nomeRival}</h4>
        </div>
        <div className="team-secondary">
          <img src={"/flamengo_escudo.png"}></img>
          <h4>Flamengo</h4>
        </div>
      </div>
    );
  }
}

const GameInfo = () => {
  const [dados, setDados] = useState<GameProp | undefined>();
  const [loadingInProgress, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setDados(await getNextGame());

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="game-thing">
        <div className="box">
          {loadingInProgress && (
            <div className="loader-container">
              <ClipLoader color={"#808080"} size={80} />
            </div>
          )}

          {dados && (
            <>
              <h3 className="championship">{dados.campeonato}</h3>
              <Mandante {...dados} />
              <h4>{formatDate(dados.dataHoraJogo)}</h4>
              <h4>{formatTime(dados.dataHoraJogo)}</h4>
              <a
                className="link"
                href={generateGoogleCalendarLink(
                  dados.nomeRival,
                  dados.dataHoraJogo
                )}
                target="_blank"
              >
                Adicionar ao calendário
                <i className="icon-calendar fa-regular fa-calendar"></i>
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GameInfo;
