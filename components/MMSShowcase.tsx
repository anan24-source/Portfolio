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
import { useLanguage } from '@/lib/language'

const copy = {
  en: {
    caseLabel: 'Featured Case Study',
    title: 'Machine Monitoring System',
    subtitle: 'A manufacturing IT project upgraded in clear checkpoints: first replacing manual machine data recording, then adding monitoring and one-click remote deployment to protect data continuity across the factory production area.',
    metrics: ['CNC Machines', 'Collector PCs', 'Hours saved/day'],
    checkpointOneLabel: 'Checkpoint 1 - Project Start',
    checkpointOneTitle: 'Replace manual recording with automated MMS data collection',
    checkpointOneText: 'The first goal was to stop using production staff to walk through the factory and manually record output, efficiency, and cycle time from every machine.',
    beforeTitle: 'Before MMS',
    beforeText: 'Operators recorded data from 455 machines, 3 rounds per day. One machine took about 1 minute, and one person could cover around 30 machines per round.',
    beforeMetric: '15 people',
    beforeMetricNote: 'needed per round',
    afterTitle: 'After MMS',
    afterText: 'Machine data is collected automatically and shown in real time through the Merlin factory layout, removing the manual recording workload from the production area.',
    afterMetric: '22.75 hours/day',
    afterMetricNote: 'recording time removed',
    networkTitle: 'Network picture in simple terms',
    networkText: 'Think of the factory as 13 data zones. Machines in each zone send their CNC data through LAN cables to the closest Collector PC. Each Collector PC becomes the local station for that zone, then forwards clean, structured data to the Merlin Server. The server combines everything into one live factory map.',
    serverDesc: 'Merlin program runs here for realtime layout and reports',
    collectorDesc: 'Station-level Java collector',
    collectorSummary: '13 Collector PCs total, with 2 stations shown as examples',
    layoutCaption: 'Factory layout map used to visualize real-time machine status.',
    hardSkills: 'Hard skills used',
    checkpointTwoLabel: 'Checkpoint 2 - System Upgrade',
    checkpointTwoTitle: 'Add collector_pc_health_monitor for uptime and remote updates',
    checkpointTwoText: 'After MMS was running, two operational problems became clear: collector stations could be forgotten or left without the collector program running, and every program update still required IT to visit all stations manually.',
    issueOneTitle: 'Problem 1: Missing daily data',
    issueOneText: 'Production staff sometimes forgot to turn on a Collector PC or forgot to start collector_pcms_nvk_new_server. This caused output, efficiency, and cycle time data to disappear for that day.',
    issueOneTag: 'Happened 1-2 times every 2 weeks',
    issueTwoTitle: 'Problem 2: Slow program updates',
    issueTwoText: 'Every collector update required one IT staff member to walk into production, connect a flash drive, and install the new version on each Collector PC.',
    issueTwoTag: '13 stations took about 4 hours',
    resultLabel: 'Health Monitor Result',
    resultTitle: 'From manual checking to self-recovery and office-based deployment',
    resultOne: 'Checks which Collector PCs are online and whether collector_pcms_nvk_new_server is running. If the program is not opened within 30 minutes, Health Monitor starts it automatically.',
    resultTwo: 'The Update button sends the selected new version to each Collector PC from the office, compiles it remotely, and avoids entering the production area.',
    outcomes: ['forgotten-start issue reduced', 'manual station update removed', 'remote update from office'],
    monitorCaption: 'Health Monitor checks Collector PC status and collector program uptime.',
    skillsOne: [
      {
        icon: Network,
        title: 'Network Architecture',
        desc: 'Designed a plant-wide LAN structure where every CNC machine connects to a nearby Collector PC, and every Collector PC forwards data to the central Merlin Server.',
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
    ],
    skillsTwo: [
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
    ],
  },
  th: {
    caseLabel: 'Featured Case Study',
    title: 'Machine Monitoring System',
    subtitle: 'โปรเจกต์ Manufacturing IT ที่พัฒนาเป็น checkpoint ชัดเจน: เริ่มจากแทนที่ manual machine data recording แล้วต่อยอดด้วย monitoring และ one-click remote deployment เพื่อป้องกันข้อมูลขาดหายบน Production Factory',
    metrics: ['CNC Machines', 'Collector PCs', 'Hours saved/day'],
    checkpointOneLabel: 'Checkpoint 1 - Project Start',
    checkpointOneTitle: 'แทนที่ manual recording ด้วย automated MMS data collection',
    checkpointOneText: 'เป้าหมายแรกคือหยุดการให้ production staff เดินบันทึก output, efficiency และ cycle time จากเครื่องจักรทุกเครื่องด้วยมือ',
    beforeTitle: 'Before MMS',
    beforeText: 'Operators ต้องบันทึกข้อมูลจาก 455 machines วันละ 3 รอบ เครื่องหนึ่งใช้เวลาประมาณ 1 นาที และหนึ่งคนดูแลได้ประมาณ 30 machines ต่อรอบ',
    beforeMetric: '15 people',
    beforeMetricNote: 'needed per round',
    afterTitle: 'After MMS',
    afterText: 'Machine data ถูกเก็บอัตโนมัติและแสดงผลแบบ real time ผ่าน Merlin factory layout ทำให้ลดภาระ manual recording จาก Production Factory',
    afterMetric: '22.75 hours/day',
    afterMetricNote: 'recording time removed',
    networkTitle: 'Network picture in simple terms',
    networkText: 'มองโรงงานเป็น 13 data zones โดยเครื่องจักรในแต่ละ zone ส่ง CNC data ผ่านสาย LAN ไปยัง Collector PC ที่ใกล้ที่สุด จากนั้น Collector PC ส่งข้อมูลที่จัดรูปแบบแล้วไปยัง Merlin Server เพื่อรวมเป็น live factory map',
    serverDesc: 'Merlin program runs here for realtime layout and reports',
    collectorDesc: 'Station-level Java collector',
    collectorSummary: 'มี Collector PCs ทั้งหมด 13 เครื่อง โดยในภาพแสดงตัวอย่าง 2 stations',
    layoutCaption: 'Factory layout map สำหรับดูสถานะเครื่องจักรแบบ real time',
    hardSkills: 'Hard skills used',
    checkpointTwoLabel: 'Checkpoint 2 - System Upgrade',
    checkpointTwoTitle: 'เพิ่ม collector_pc_health_monitor สำหรับ uptime และ remote updates',
    checkpointTwoText: 'หลัง MMS เริ่มใช้งาน พบปัญหาหลัก 2 เรื่อง: บาง station อาจลืมเปิด Collector PC หรือโปรแกรม collector และการ update program ยังต้องให้ IT เข้าไปทำที่แต่ละ station',
    issueOneTitle: 'Problem 1: Missing daily data',
    issueOneText: 'บางครั้ง production staff ลืมเปิด Collector PC หรือลืม start collector_pcms_nvk_new_server ทำให้ output, efficiency และ cycle time ของวันนั้นหายไป',
    issueOneTag: 'เกิดขึ้น 1-2 ครั้ง ทุก 2 สัปดาห์',
    issueTwoTitle: 'Problem 2: Slow program updates',
    issueTwoText: 'ทุกครั้งที่ update collector ต้องให้ IT เดินเข้า production, ต่อ flash drive และติดตั้ง version ใหม่ใน Collector PC แต่ละเครื่อง',
    issueTwoTag: '13 stations ใช้เวลาประมาณ 4 ชั่วโมง',
    resultLabel: 'Health Monitor Result',
    resultTitle: 'จาก manual checking สู่ self-recovery และ office-based deployment',
    resultOne: 'ตรวจสอบว่า Collector PCs online หรือไม่ และ collector_pcms_nvk_new_server ทำงานอยู่หรือไม่ ถ้าโปรแกรมไม่ถูกเปิดภายใน 30 นาที Health Monitor จะ start ให้อัตโนมัติ',
    resultTwo: 'ปุ่ม Update ส่ง version ใหม่จาก office ไปยัง Collector PC, compile แบบ remote และลดการเข้า production area',
    outcomes: ['ลด forgotten-start issue', 'ลด manual station update', 'remote update from office'],
    monitorCaption: 'Health Monitor ใช้ตรวจสถานะ Collector PC และ collector program uptime',
    skillsOne: [
      {
        icon: Network,
        title: 'Network Architecture',
        desc: 'ออกแบบ plant-wide LAN structure ให้ CNC machine แต่ละเครื่องเชื่อมไปยัง Collector PC ใกล้ที่สุด และส่งต่อข้อมูลไป Merlin Server',
      },
      {
        icon: Cpu,
        title: 'Fanuc FOCAS / C Library',
        desc: 'ใช้ Fanuc library commands ผ่าน C/JNI concepts เพื่ออ่าน output count, efficiency, cycle time และ machine status จากเครื่องจักร',
      },
      {
        icon: Code2,
        title: 'Java Collector + Merlin',
        desc: 'พัฒนา collector_pcms_nvk_new_server ด้วย Java เพื่อรวบรวมข้อมูลจากเครื่องในแต่ละ station ส่งเข้า Merlin และแสดงสถานะแบบ real time',
      },
    ],
    skillsTwo: [
      {
        icon: Code2,
        title: 'Java Health Monitor',
        desc: 'พัฒนา collector_pc_health_monitor เพื่อตรวจสอบ Collector PCs ทุกเครื่อง และเช็คว่า collector_pcms_nvk_new_server ยังทำงานอยู่',
      },
      {
        icon: Terminal,
        title: 'SSH / SCP Command Automation',
        desc: 'ใช้ command-line automation เพื่อ start/stop collector programs, ส่ง source files และ compile version ใหม่บนแต่ละ station แบบ remote',
      },
    ],
  },
}

const collectorGroups = [
  {
    name: 'Collector PC 01',
    machines: ['CNC 01', 'CNC 02', 'CNC 03'],
  },
  {
    name: 'Collector PC 02',
    machines: ['CNC 04', 'CNC 05', 'CNC 06'],
  },
]

export default function MMSShowcase() {
  const { language } = useLanguage()
  const t = copy[language]

  return (
    <article className={styles.showcase}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{t.caseLabel}</p>
          <h3 className={styles.title}>{t.title}</h3>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.heroMetrics} aria-label="MMS headline metrics">
          {['455', '13', '22.75'].map((value, index) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{t.metrics[index]}</span>
            </div>
          ))}
        </div>
      </header>

      <section className={styles.checkpoint}>
        <div className={styles.checkpointMarker}>
          <span>01</span>
        </div>

        <div className={styles.checkpointBody}>
          <div className={styles.checkpointHeader}>
            <p className={styles.stepLabel}>{t.checkpointOneLabel}</p>
            <h4>{t.checkpointOneTitle}</h4>
            <p>{t.checkpointOneText}</p>
          </div>

          <div className={styles.beforeAfterGrid}>
            <div className={styles.problemCard}>
              <div className={styles.storyImage}>
              <Image src="/img/Generated image 1.png" alt="Operator walking through the production area to manually record machine data" width={960} height={540} sizes="(max-width: 820px) 100vw, 50vw" />
              </div>
              <h5>{t.beforeTitle}</h5>
              <p>{t.beforeText}</p>
              <div className={styles.metricRow}>
                <span>{t.beforeMetric}</span>
                <small>{t.beforeMetricNote}</small>
              </div>
            </div>

            <div className={styles.resultCard}>
              <div className={styles.storyImage}>
                <Image src="/img/Generated image 2.png" alt="Automated system collecting CNC machine data in real time" width={960} height={540} sizes="(max-width: 820px) 100vw, 50vw" />
              </div>
              <h5>{t.afterTitle}</h5>
              <p>{t.afterText}</p>
              <div className={styles.metricRow}>
                <span>{t.afterMetric}</span>
                <small>{t.afterMetricNote}</small>
              </div>
            </div>
          </div>

          <div className={styles.networkPanel}>
            <div className={styles.networkCopy}>
              <h5>{t.networkTitle}</h5>
              <p>{t.networkText}</p>
            </div>

            <div className={styles.topology} aria-label="MMS LAN topology">
              <div className={styles.serverLayer}>
                <div className={`${styles.topologyNode} ${styles.serverNode}`}>
                  <Server size={26} />
                  <strong>Merlin Server</strong>
                  <span>{t.serverDesc}</span>
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
                      <span>{t.collectorDesc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.collectorSummary}>{t.collectorSummary}</p>

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
              <Image src="/projects/mms/factory-layout-simulated.svg" alt="Factory layout with machine status boxes" width={900} height={560} sizes="(max-width: 768px) 100vw, 50vw" />
              <figcaption>{t.layoutCaption}</figcaption>
            </figure>

            <div className={styles.skillPanel}>
              <h5>{t.hardSkills}</h5>
              {t.skillsOne.map(skill => {
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
            <p className={styles.stepLabel}>{t.checkpointTwoLabel}</p>
            <h4>{t.checkpointTwoTitle}</h4>
            <p>{t.checkpointTwoText}</p>
          </div>

          <div className={styles.issueGrid}>
            <div className={styles.issueCard}>
              <AlertTriangle size={20} />
              <h5>{t.issueOneTitle}</h5>
              <p>{t.issueOneText}</p>
              <span>{t.issueOneTag}</span>
            </div>

            <div className={styles.issueCard}>
              <AlertTriangle size={20} />
              <h5>{t.issueTwoTitle}</h5>
              <p>{t.issueTwoText}</p>
              <span>{t.issueTwoTag}</span>
            </div>
          </div>

          <div className={styles.upgradePanel}>
            <div className={styles.upgradeText}>
              <p className={styles.stepLabel}>{t.resultLabel}</p>
              <h5>{t.resultTitle}</h5>
              <div className={styles.resultList}>
                <div>
                  <ShieldCheck size={20} />
                  <p>{t.resultOne}</p>
                </div>
                <div>
                  <CheckCircle2 size={20} />
                  <p>{t.resultTwo}</p>
                </div>
              </div>
            </div>

            <div className={styles.outcomeStack}>
              {['100%', '4 hours', '1 click'].map((value, index) => (
                <div key={value}>
                  <strong>{value}</strong>
                  <span>{t.outcomes[index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.visualGrid}>
            <figure className={styles.imageFrame}>
              <Image src="/projects/mms/health-monitor-running.png" alt="Collector PC Health Monitor showing station status" width={900} height={560} sizes="(max-width: 768px) 100vw, 50vw" />
              <figcaption>{t.monitorCaption}</figcaption>
            </figure>

            <div className={styles.skillPanel}>
              <h5>{t.hardSkills}</h5>
              {t.skillsTwo.map(skill => {
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
