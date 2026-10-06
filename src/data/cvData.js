export const cvData = {
  personal: {
    name: "Sultan Md Aslam",
    title: "Software Engineer II",
    subtitle: "Backend & Distributed Systems Specialist",
    experienceYears: "5+ Years",
    email: "smaslam199320@gmail.com",
    phone: "+8801823140141",
    location: "154/8, Jheelkanoon residential Area, Hatirjheel, Dhaka",
    linkedin: "https://linkedin.com/in/sultan-md-aslam-748835174",
    linkedinDisplay: "linkedin.com/in/sultan-md-aslam-748835174",
    avatar: "/profile.png",
    bio: "Senior Backend Engineer with 5+ years of experience designing and scaling distributed systems, real-time trip orchestration, event-driven architectures, and high-throughput microservices using Java, Spring Boot, Kafka, ScyllaDB, RabbitMQ, and Kubernetes.",
    availability: "Available for Senior / Lead Backend Engineering roles"
  },
  stats: [
    { label: "Experience", value: "5+ Years", detail: "High-scale engineering" },
    { label: "Companies", value: "4 Firms", detail: "FinTech & Rideshare" },
    { label: "Real-Time Events", value: "Sub-Second", detail: "WebSocket & Kafka" },
    { label: "Core Stack", value: "Java / Spring", detail: "Distributed microservices" }
  ],
  experiences: [
    {
      id: "foodi",
      role: "Software Engineer II",
      company: "Foodi",
      period: "May 2025 – Present",
      isCurrent: true,
      department: "Ridesharing Core Engine",
      summary: "Architecting and scaling trip orchestration, real-time driver-passenger matching, event-driven dispatching, and high-frequency WebSocket communication.",
      highlights: [
        {
          title: "Trip Orchestration & Lifecycle Tracking",
          desc: "Designed and built full ride lifecycle state machines (matching, driver assignment, pickup, route progress, stoppages, completion, and cash collection) with WebSocket-based sub-second updates."
        },
        {
          title: "Strategy Pattern & Event-Driven Trip Dispatch",
          desc: "Implemented flexible trip request dispatching leveraging the Strategy Pattern and Event-Driven Architecture, enabling extensible dynamic dispatch rules and decoupled inter-service messaging."
        },
        {
          title: "Trip Search & Proximity Filtering",
          desc: "Engineered high-performance trip search algorithms factoring geospatial coordinates, driver availability, and business filtering rules for sub-second driver matching."
        },
        {
          title: "Intelligent Driver Scoring & Ranking System",
          desc: "Developed and tuned real-time driver ranking combining multidimensional factors: customer ratings, trip acceptance/completion rates, and proximity."
        },
        {
          title: "Advanced Route Updates & Scheduling",
          desc: "Engineered cancellation handling workflows, dynamic ETA and route calculations, and integrated advance scheduled bookings for enhanced commuter flexibility."
        },
        {
          title: "WebSocket Gateway & Multi-Dispatch Bidding",
          desc: "Integrated scalable WebSocket Gateway supporting concurrent multi-driver dispatch (bidding), live telemetry tracking, and seamless cross-platform sync."
        },
        {
          title: "RabbitMQ Relay & ScyllaDB/Redis Optimization",
          desc: "Implemented database metadata tracking and configured RabbitMQ as an external relay broker for persistent, durable message delivery. Cut database latency through Redis caching and ScyllaDB/PostgreSQL query tuning."
        }
      ],
      techStack: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "ScyllaDB",
        "Kafka",
        "RabbitMQ",
        "WebSocket",
        "Gradle",
        "Docker",
        "Kubernetes (K8s)",
        "Redis"
      ]
    },
    {
      id: "adn-diginet",
      role: "Software Engineer",
      company: "ADN Diginet Ltd",
      period: "Feb 2023 – Apr 2025",
      isCurrent: false,
      department: "My Life (MetLife Insurance App)",
      summary: "Engineered mission-critical financial and insurance services, Kafka stream idempotency, complex data migrations, and load-tested REST APIs.",
      highlights: [
        {
          title: "Kafka Idempotency & Transaction Integrity",
          desc: "Designed and enforced Kafka consumer idempotency across core transactional services, ensuring zero duplicate processing and guaranteed consistency across distributed financial workflows."
        },
        {
          title: "Enterprise Data Migration",
          desc: "Led end-to-end data migration pipelines, securely shifting millions of records from legacy databases to modernized schemas with zero downtime."
        },
        {
          title: "System Architecture & High-Performance APIs",
          desc: "Spearheaded architectural documentation, API design, and stress testing using K6, ensuring robust SLA compliance under heavy peak traffic."
        }
      ],
      techStack: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "MSSQL",
        "Kafka",
        "Docker",
        "Kubernetes (K8s)",
        "Maven",
        "JavaScript",
        "K6",
        "Git"
      ]
    },
    {
      id: "ctrends",
      role: "Software Engineer",
      company: "Ctrends Software & Services Ltd",
      period: "Aug 2022 – Feb 2023",
      isCurrent: false,
      department: "Enterprise Web Applications",
      summary: "Developed robust enterprise applications with Java Spring Boot, collaborating with cross-functional stakeholders on feature lifecycles.",
      highlights: [
        {
          title: "Enterprise Application Engineering",
          desc: "Designed, developed, and tested enterprise-grade microservices and web apps using Java Spring Boot and PostgreSQL."
        },
        {
          title: "Cross-Functional Collaboration & QA",
          desc: "Partnered closely with QA, product, and frontend engineers to deploy scalable modules, utilizing K6 for performance benchmarks."
        }
      ],
      techStack: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Kafka",
        "Maven",
        "Docker",
        "Kubernetes",
        "K6",
        "Git"
      ]
    },
    {
      id: "asian-tech",
      role: "Programmer",
      company: "Asian Technology Limited",
      period: "Feb 2021 – Jul 2022",
      isCurrent: false,
      department: "Software Engineering",
      summary: "Built scalable backend services, database schema designs, and messaging pipelines for client enterprise solutions.",
      highlights: [
        {
          title: "Spring Boot Microservices",
          desc: "Built scalable backend modules and RESTful endpoints using Java and Spring Boot, persisting data across MSSQL instances."
        },
        {
          title: "Kafka Event Pipelines",
          desc: "Integrated asynchronous event streaming with Apache Kafka for background data sync and notification queues."
        }
      ],
      techStack: [
        "Java",
        "Spring Boot",
        "MSSQL",
        "Kafka",
        "Maven",
        "Git"
      ]
    }
  ],
  skillCategories: [
    {
      category: "Backend & Core",
      color: "emerald",
      skills: [
        { name: "Java", level: 95, highlight: true },
        { name: "Spring Boot", level: 95, highlight: true },
        { name: "Microservices Architecture", level: 90, highlight: true },
        { name: "SOLID Principles", level: 95, highlight: false },
        { name: "Design Patterns (Strategy, Factory, etc.)", level: 92, highlight: true },
        { name: "RESTful API Design", level: 94, highlight: false },
        { name: "WebSocket & Realtime", level: 90, highlight: true }
      ]
    },
    {
      category: "Messaging & Streaming",
      color: "indigo",
      skills: [
        { name: "Apache Kafka", level: 92, highlight: true },
        { name: "Kafka Idempotency", level: 90, highlight: true },
        { name: "RabbitMQ", level: 88, highlight: true },
        { name: "Event-Driven Architecture", level: 92, highlight: true },
        { name: "Message Durability & Relays", level: 86, highlight: false }
      ]
    },
    {
      category: "Databases & In-Memory",
      color: "cyan",
      skills: [
        { name: "PostgreSQL", level: 92, highlight: true },
        { name: "ScyllaDB (NoSQL / Cassandra)", level: 85, highlight: true },
        { name: "Redis Caching", level: 90, highlight: true },
        { name: "MSSQL", level: 85, highlight: false },
        { name: "MySQL", level: 84, highlight: false }
      ]
    },
    {
      category: "DevOps, Cloud & Testing",
      color: "amber",
      skills: [
        { name: "Docker", level: 90, highlight: true },
        { name: "Kubernetes (K8s)", level: 85, highlight: true },
        { name: "Gradle & Maven", level: 92, highlight: false },
        { name: "Git Version Control", level: 95, highlight: false },
        { name: "K6 Load Testing", level: 88, highlight: true },
        { name: "Linux Systems", level: 88, highlight: false }
      ]
    }
  ],
  systemArchitectureShowcase: [
    {
      title: "Rideshare Real-Time Trip Orchestration",
      company: "Foodi",
      tags: ["WebSocket Gateway", "ScyllaDB", "Strategy Pattern", "RabbitMQ Relay"],
      description: "A high-concurrency trip dispatch engine managing the full driver-passenger lifecycle with multi-dispatch bidding, driver scoring, and live GPS tracking.",
      architecture: [
        "Event-Driven Trip State Machine with WebSocket broadcast",
        "Geospatial driver ranking algorithm combining rating, acceptance & proximity",
        "RabbitMQ relay for durable background message persistence",
        "Sub-second Redis cache layer reducing primary database load"
      ]
    },
    {
      title: "Idempotent Event Stream for Core Insurance",
      company: "ADN Diginet / MetLife",
      tags: ["Apache Kafka", "Spring Boot", "Transaction Outbox", "MSSQL/Postgres"],
      description: "Distributed transaction guarantee ensuring zero duplicate transactions across multi-service policy management and claims lifecycles.",
      architecture: [
        "Deduplication barrier with unique transaction event keys",
        "Failover resilience & guaranteed at-least-once with idempotent consumer execution",
        "Zero-downtime legacy data migration with automated validation",
        "Performance validation with K6 peak load scripts"
      ]
    }
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science and Engineering",
      institution: "Premier University Chittagong",
      period: "Graduated 2019",
      cgpa: "3.02 / 4.00",
      description: "Focused on Algorithms, Data Structures, Distributed Computing, Database Systems, and Object-Oriented Software Engineering."
    }
  ]
};
