'use client'

import Image from 'next/image'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import styles from './MMSShowcase.module.css'

const checkpointOneSkills = [
  {
    icon: Network,
    title: 'Network Architecture',
    desc: 'Designed a plant-wide LAN structure where every CNC machine connects to a nearby Collector PC, and every Collector PC forwards data to the central Merlin Server. IP rules were organized so each address clearly identifies whether it belongs to the server, a collector station, or a specific machine number.',
  },
  {
    icon: Cpu,
    title: 'Fanuc FOCAS / C Library',
    desc: 'Used Fanuc library commands through C/JNI concepts to read CNC data such as output count, efficiency, cycle time, and machine status directly from the machines.',
  },
  {
    icon: Code2,
    title: 'Java Collector + Merlin',
    desc: 'Built collector_pcms_nvk_new_server in Java to gather data from the machines handled by each station, send it to Merlin on the server, and display real-time status on a factory layout map.',
  },
]

const checkpointTwoSkills = [
  {
    icon: Code2,
    title: 'Java Health Monitor',
    desc: 'Built collector_pc_health_monitor to monitor all Collector PCs, show which stations are online, and verify whether collector_pcms_nvk_new_server is running.',
  },
  {
    icon: Terminal,
    title: 'SSH / SCP Command Automation',
    desc: 'Used command-line automation to start or stop collector programs remotely, send updated Java source files to each Collector PC, and compile the new version directly on each station.',
  },
]

const collectorGroups = [
  {
    name: 'Collector PC 01',
    desc: 'Station-level Java collector',
    machines: ['CNC 01', 'CNC 02', 'CNC 03'],
  },
  {
    name: 'Collector PC 02',
    desc: 'Station-level Java collector',
    machines: ['CNC 04', 'CNC 05', 'CNC 06'],
  },
]

export default function MMSShowcase() {
  return (
    <article className={styles.showcase}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Featured Case Study</p>
          <h3 className={styles.title}>Machine Monitoring System</h3>
          <p className={styles.subtitle}>
            A manufacturing IT project upgraded in clear checkpoints: first replacing manual
            machine data recording, then adding monitoring and one-click remote deployment to
            protect data continuity across the factory floor.
          </p>
        </div>

        <div className={styles.heroMetrics} aria-label="MMS headline metrics">
          <div>
            <strong>455</strong>
            <span>CNC Machines</span>
          </div>
          <div>
            <strong>13</strong>
            <span>Collector PCs</span>
          </div>
          <div>
            <strong>22.75</strong>
            <span>Hours saved/day</span>
          </div>
        </div>
      </header>

      <section className={styles.checkpoint}>
        <div className={styles.checkpointMarker}>
          <span>01</span>
        </div>

        <div className={styles.checkpointBody}>
          <div className={styles.checkpointHeader}>
            <p className={styles.stepLabel}>Checkpoint 1 - Project Start</p>
            <h4>Replace manual recording with automated MMS data collection</h4>
            <p>
              The first goal was to stop using production staff to walk through the factory and
              manually record output, efficiency, and cycle time from every machine.
            </p>
          </div>

          <div className={styles.beforeAfterGrid}>
            <div className={styles.problemCard}>
              <div className={styles.storyImage}>
                <Image
                  src="/img/Generated image 1.png"
                  alt="Operator walking through the production floor to manually record machine data"
                  width={960}
                  height={540}
                  sizes="(max-width: 820px) 100vw, 50vw"
                />
              </div>
              <h5>Before MMS</h5>
              <p>
                Operators recorded data from 455 machines, 3 rounds per day. One machine took
                about 1 minute, and one person could cover around 30 machines per round.
              </p>
              <div className={styles.metricRow}>
                <span>15 people</span>
                <small>needed per round</small>
              </div>
            </div>

            <div className={styles.resultCard}>
              <div className={styles.storyImage}>
                <Image
                  src="/img/Generated image 2.png"
                  alt="Automated system collecting CNC machine data in real time"
                  width={960}
                  height={540}
                  sizes="(max-width: 820px) 100vw, 50vw"
                />
              </div>
              <h5>After MMS</h5>
              <p>
                Machine data is collected automatically and shown in real time through the Merlin
                factory layout, removing the manual recording workload from the production floor.
              </p>
              <div className={styles.metricRow}>
                <span>22.75 hours/day</span>
                <small>recording time removed</small>
              </div>
            </div>
          </div>

          <div className={styles.networkPanel}>
            <div className={styles.networkCopy}>
              <h5>Network picture in simple terms</h5>
              <p>
                Think of the factory as 13 data zones. Machines in each zone send their CNC data
                through LAN cables to the closest Collector PC. Each Collector PC becomes the local
                station for that zone, then forwards clean, structured data to the Merlin Server.
                The server combines everything into one live factory map.
              </p>
            </div>

            <div className={styles.topology} aria-label="MMS LAN topology">
              <div className={styles.serverLayer}>
                <div className={`${styles.topologyNode} ${styles.serverNode}`}>
                  <Server size={26} />
                  <strong>Merlin Server</strong>
                  <span>Merlin program runs here for realtime layout and reports</span>
                </div>
              </div>

              <div className={styles.lanDrop} aria-hidden="true">
                <span>LAN</span>
              </div>

              <div className={styles.collectorLayer}>
                {collectorGroups.map(group => (
                  <div className={styles.collectorBranch} key={group.name}>
                    <div className={`${styles.topologyNode} ${styles.collectorNode}`}>
                      <Monitor size={24} />
                      <strong>{group.name}</strong>
                      <span>{group.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.collectorSummary}>13 Collector PCs total, with 2 stations shown as examples</p>

              <div className={styles.machineLayer}>
                {collectorGroups.map(group => (
                  <div className={styles.machineGroup} key={`${group.name}-machines`}>
                    {group.machines.map(machine => (
                      <div className={styles.machineNode} key={machine}>
                        <Cpu size={19} />
                        <span>{machine}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.visualGrid}>
            <figure className={styles.imageFrame}>
              <Image
                src="/projects/mms/factory-layout.jpg"
                alt="Factory layout used by the Machine Monitoring System"
                width={900}
                height={560}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <figcaption>Factory layout map used to visualize real-time machine status.</figcaption>
            </figure>

            <div className={styles.skillPanel}>
              <h5>Hard skills used</h5>
              {checkpointOneSkills.map(skill => {
                const Icon = skill.icon
                return (
                  <div className={styles.skillItem} key={skill.title}>
                    <div className={styles.skillIcon}><Icon size={18} /></div>
                    <div>
                      <strong>{skill.title}</strong>
                      <p>{skill.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.checkpoint}>
        <div className={styles.checkpointMarker}>
          <span>02</span>
        </div>

        <div className={styles.checkpointBody}>
          <div className={styles.checkpointHeader}>
            <p className={styles.stepLabel}>Checkpoint 2 - System Upgrade</p>
            <h4>Add collector_pc_health_monitor for uptime and remote updates</h4>
            <p>
              After MMS was running, two operational problems became clear: collector stations
              could be forgotten or left without the collector program running, and every program
              update still required IT to visit all stations manually.
            </p>
          </div>

          <div className={styles.issueGrid}>
            <div className={styles.issueCard}>
              <AlertTriangle size={20} />
              <h5>Problem 1: Missing daily data</h5>
              <p>
                Production staff sometimes forgot to turn on a Collector PC or forgot to start
                collector_pcms_nvk_new_server. This caused output, efficiency, and cycle time data
                to disappear for that day.
              </p>
              <span>Happened 1-2 times every 2 weeks</span>
            </div>

            <div className={styles.issueCard}>
              <AlertTriangle size={20} />
              <h5>Problem 2: Slow program updates</h5>
              <p>
                Every collector update required one IT staff member to walk into production,
                connect a flash drive, and install the new version on each Collector PC.
              </p>
              <span>13 stations took about 4 hours</span>
            </div>
          </div>

          <div className={styles.upgradePanel}>
            <div className={styles.upgradeText}>
              <p className={styles.stepLabel}>Health Monitor Result</p>
              <h5>From manual checking to self-recovery and office-based deployment</h5>
              <div className={styles.resultList}>
                <div>
                  <ShieldCheck size={20} />
                  <p>
                    Checks which Collector PCs are online and whether collector_pcms_nvk_new_server
                    is running. If the program is not opened within 30 minutes, Health Monitor
                    starts it automatically.
                  </p>
                </div>
                <div>
                  <CheckCircle2 size={20} />
                  <p>
                    The Update button sends the selected new version to each Collector PC from the
                    office, compiles it remotely, and avoids entering the production area.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.outcomeStack}>
              <div>
                <strong>100%</strong>
                <span>forgotten-start issue reduced</span>
              </div>
              <div>
                <strong>4 hours</strong>
                <span>manual station update removed</span>
              </div>
              <div>
                <strong>1 click</strong>
                <span>remote update from office</span>
              </div>
            </div>
          </div>

          <div className={styles.visualGrid}>
            <figure className={styles.imageFrame}>
              <Image
                src="/projects/mms/health-monitor-running.png"
                alt="Collector PC Health Monitor showing station status"
                width={900}
                height={560}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <figcaption>Health Monitor checks Collector PC status and collector program uptime.</figcaption>
            </figure>

            <div className={styles.skillPanel}>
              <h5>Hard skills used</h5>
              {checkpointTwoSkills.map(skill => {
                const Icon = skill.icon
                return (
                  <div className={styles.skillItem} key={skill.title}>
                    <div className={styles.skillIcon}><Icon size={18} /></div>
                    <div>
                      <strong>{skill.title}</strong>
                      <p>{skill.desc}</p>
                    </div>
                  </div>
                )
              })}
              <div className={styles.commandFlow}>
                <Activity size={18} />
                <span>Office PC</span>
                <ArrowRight size={16} />
                <span>SSH / SCP</span>
                <ArrowRight size={16} />
                <span>Collector PC</span>
                <ArrowRight size={16} />
                <span>Compile + Run</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
