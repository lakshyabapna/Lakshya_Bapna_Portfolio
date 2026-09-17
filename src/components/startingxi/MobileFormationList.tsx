import React from 'react';
import type { ProjectItem } from '../../data/projects';
import { STARTING_XI_FORMATION, type PitchPosition } from '../../data/startingXI';
import './MobileFormationList.css';

interface MobileFormationListProps {
  projects: ProjectItem[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
}

interface ZoneGroup {
  zone: PitchPosition['pitchZone'];
  title: string;
  items: Array<{ project: ProjectItem; position: PitchPosition }>;
}

export const MobileFormationList: React.FC<MobileFormationListProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
}) => {
  const projectMap = new Map<string, ProjectItem>();
  projects.forEach((p) => projectMap.set(p.id, p));

  const groups: ZoneGroup[] = [
    { zone: 'forward', title: 'FORWARDS // ATTACK & GENAI', items: [] },
    { zone: 'midfield', title: 'MIDFIELD // WEB ARCHITECTURE', items: [] },
    { zone: 'defence', title: 'DEFENCE // DATA & PLATFORM', items: [] },
    { zone: 'goalkeeper', title: 'GOALKEEPER // ANALYTICS ANCHOR', items: [] },
  ];

  STARTING_XI_FORMATION.forEach((pos) => {
    const proj = projectMap.get(pos.projectId);
    if (!proj) return;
    const group = groups.find((g) => g.zone === pos.pitchZone);
    if (group) {
      group.items.push({ project: proj, position: pos });
    }
  });

  return (
    <div className="xi-mobile-list" role="region" aria-label="Mobile Tactical Formation List">
      {groups.map((group) => (
        <div key={group.zone} className="xi-mobile-zone-group">
          <div className="xi-mobile-zone-header">
            <span className="xi-mobile-zone-title">{group.title}</span>
            <span className="xi-mobile-zone-count">[{group.items.length} PLAYERS]</span>
          </div>

          <div className="xi-mobile-cards-grid">
            {group.items.map(({ project, position }) => {
              const isSelected = selectedProjectId === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  className={`xi-mobile-card-btn${isSelected ? ' is-selected' : ''}`}
                  onClick={() => onSelectProject(project.id)}
                  aria-label={`Project: ${project.name}, kit ${project.kitNumber}, role ${position.tacticalLabel}. Tap for scouting dossier.`}
                >
                  <div className="xi-mobile-card-left">
                    <span className="xi-mobile-card-kit">{project.kitNumber}</span>
                    <div className="xi-mobile-card-info">
                      <span className="xi-mobile-card-name">{project.name}</span>
                      <span className="xi-mobile-card-cat">
                        {project.technologies.slice(0, 2).join(' • ')}
                      </span>
                    </div>
                  </div>

                  <div className="xi-mobile-card-right">
                    {project.isLive && (
                      <span className="xi-mobile-card-dot" title="Live Deployed" />
                    )}
                    {project.isCollaborative && (
                      <span className="xi-mobile-card-collab">COLLAB</span>
                    )}
                    <span className="xi-mobile-card-tac">{position.tacticalLabel}</span>
                    <span className="xi-mobile-card-arrow" aria-hidden="true">➔</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
