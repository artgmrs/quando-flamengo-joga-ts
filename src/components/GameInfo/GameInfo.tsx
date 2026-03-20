import { useGameData } from "../../hooks/useGameData.ts";
import { formatDate, formatTime } from "../../utils/DateUtils.ts";
import { generateGoogleCalendarLink } from "../../utils/GoogleCalendarUtils.ts";
import ClipLoader from "react-spinners/ClipLoader";
import { GameProp } from "../../types/GameProp.ts";
import "./GameInfo.css";

interface TeamDisplayProps {
  name: string;
  logo: string;
  isHome?: boolean;
}

function TeamDisplay({ name, logo, isHome = false }: TeamDisplayProps) {
  return (
    <div className={`team-display ${isHome ? 'team-home' : 'team-away'}`}>
      <div className="team-logo-wrapper">
        <img 
          src={logo} 
          alt={`Escudo do ${name}`}
          className="team-logo"
          loading="eager"
        />
      </div>
      <span className="team-name">{name}</span>
    </div>
  );
}

function Matchup({ dados }: { dados: GameProp }) {
  const isFlamengoHome = dados.mandante;
  
  return (
    <div className="matchup">
      <TeamDisplay 
        name={isFlamengoHome ? "Flamengo" : dados.nomeRival}
        logo={isFlamengoHome ? "/flamengo_escudo.png" : dados.imagemRival}
        isHome={true}
      />
      
      <div className="vs-divider">
        <span className="vs-text">VS</span>
      </div>
      
      <TeamDisplay 
        name={isFlamengoHome ? dados.nomeRival : "Flamengo"}
        logo={isFlamengoHome ? dados.imagemRival : "/flamengo_escudo.png"}
        isHome={false}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-spinner-wrapper">
        <ClipLoader 
          color="#DC2626" 
          size={50}
          speedMultiplier={0.8}
        />
      </div>
      <p className="loading-text">Carregando próximo jogo...</p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="error-state">
      <div className="error-icon">
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <h3 className="error-title">Ops! Algo deu errado</h3>
      <p className="error-text">Não foi possível carregar os dados do jogo.</p>
      <button onClick={onRetry} className="retry-button">
        <i className="fa-solid fa-rotate-right"></i>
        Tentar novamente
      </button>
    </div>
  );
}

function GameDetails({ dados }: { dados: GameProp }) {
  const calendarUrl = generateGoogleCalendarLink(dados.nomeRival, dados.dataHoraJogo, dados.mandante);
  
  return (
    <div className="game-details animate-fade-in-up">
      {/* Badge do Campeonato */}
      <div className="championship-badge">
        <i className="fa-solid fa-trophy"></i>
        <span>{dados.campeonato}</span>
      </div>
      
      {/* Times */}
      <Matchup dados={dados} />
      
      {/* Informações do Jogo */}
      <div className="game-info-grid">
        <div className="info-item">
          <div className="info-icon">
            <i className="fa-regular fa-calendar"></i>
          </div>
          <div className="info-content">
            <span className="info-label">Data</span>
            <span className="info-value">{formatDate(dados.dataHoraJogo)}</span>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-icon">
            <i className="fa-regular fa-clock"></i>
          </div>
          <div className="info-content">
            <span className="info-label">Horário</span>
            <span className="info-value">{formatTime(dados.dataHoraJogo)}</span>
          </div>
        </div>
      </div>
      
      {/* Botão do Calendário */}
      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="calendar-button"
        aria-label="Adicionar jogo ao Google Calendar"
      >
        <span className="button-content">
          <i className="fa-regular fa-calendar-plus"></i>
          <span>Adicionar ao calendário</span>
        </span>
        <span className="button-arrow">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
      </a>
    </div>
  );
}

const GameInfo = () => {
  const { dados, loading, error, refetch } = useGameData();

  return (
    <main className="game-container">
      <div className="game-card">
        {loading && <LoadingState />}
        
        {!loading && error && (
          <ErrorState onRetry={refetch} />
        )}
        
        {!loading && !error && dados && (
          <GameDetails dados={dados} />
        )}
      </div>
    </main>
  );
};

export default GameInfo;
