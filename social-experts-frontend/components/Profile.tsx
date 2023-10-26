import React from 'react'
import { Form, Input, InputNumber, Checkbox, Select } from 'antd'
import { init } from 'next/dist/compiled/webpack/webpack'

const { Option } = Select

export interface profileType {
  min_salary: number
  location: string
  roles: { name: string; experience: number }[]
  skills: string[]
  active: boolean
}

const emptyProfile = {
  min_salary: 0,
  location: '',
  roles: [{ name: '', experience: 0 }],
  skills: [],
  active: true,
}

interface ProfileFormProps {
  handleOnFinish: (values: profileType) => void
}

const ProfileForm = ({ handleOnFinish }: ProfileFormProps) => {
  const [form] = Form.useForm()

  const onFinish = (values: profileType) => {
    handleOnFinish(values)
  }

  return (
    <Form
      form={form}
      name="myForm"
      onFinish={onFinish}
      initialValues={emptyProfile}
      layout="vertical"
    >
      <Form.Item
        label="Minimum Salary"
        name="min_salary"
        rules={[
          {
            required: true,
            message: 'Please input the minimum salary!',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: 'Please select a location!',
          },
        ]}
      >
        <Select placeholder="Select Location">
          {['Any', 'Remote', 'Office', 'Hybrid'].map((location) => (
            <Option key={location} value={location}>
              {location}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Roles and years of experience"
        name="roles"
        rules={[
          {
            required: true,
            message: 'Please input the roles!',
          },
        ]}
      >
        <Input.Group compact>
          <Form.Item
            name={['roles', 0, 'name']}
            noStyle
            rules={[{ required: true, message: 'Role name is required' }]}
          >
            <Select
              style={{ width: '80%' }}
              placeholder="Select role name"
            >
              <Option value="Software Engineer">Software Engineer</Option>
              <Option value="Frontend Developer">Frontend Developer</Option>
              <Option value="Backend Developer">Backend Developer</Option>
              <Option value="Full Stack Developer">Full Stack Developer</Option>
              <Option value="DevOps Engineer">DevOps Engineer</Option>
              <Option value="Data Scientist">Data Scientist</Option>
              <Option value="Data Analyst">Data Analyst</Option>
              <Option value="Machine Learning Engineer">
                Machine Learning Engineer
              </Option>
              <Option value="AI Specialist">AI Specialist</Option>
              <Option value="Network Engineer">Network Engineer</Option>
              <Option value="Systems Administrator">
                Systems Administrator
              </Option>
              <Option value="Database Administrator">
                Database Administrator
              </Option>
              <Option value="UI/UX Designer">UI/UX Designer</Option>
              <Option value="QA Tester">QA Tester</Option>
              <Option value="Scrum Master">Scrum Master</Option>
              <Option value="Product Owner">Product Owner</Option>
              <Option value="Architect">Architect</Option>
              <Option value="Cybersecurity Analyst">
                Cybersecurity Analyst
              </Option>
              <Option value="Systems Analyst">Systems Analyst</Option>
              <Option value="Technical Support Engineer">
                Technical Support Engineer
              </Option>
              <Option value="IT Consultant">IT Consultant</Option>
              <Option value="Data Engineer">Data Engineer</Option>
              <Option value="Network Administrator">
                Network Administrator
              </Option>
              <Option value="Game Developer">Game Developer</Option>
              <Option value="Cloud Engineer">Cloud Engineer</Option>
              <Option value="Embedded Systems Engineer">
                Embedded Systems Engineer
              </Option>
              <Option value="Solutions Architect">Solutions Architect</Option>
              <Option value="Software Tester">Software Tester</Option>
              <Option value="QA Engineer">QA Engineer</Option>
              <Option value="Content Manager">Content Manager</Option>
              <Option value="Copywriter">Copywriter</Option>
              <Option value="Editor">Editor</Option>
              <Option value="Proofreader">Proofreader</Option>
              <Option value="Translator">Translator</Option>
              <Option value="Technical Writer">Technical Writer</Option>
              <Option value="SEO Specialist">SEO Specialist</Option>
              <Option value="Product Analyst">Product Analyst</Option>
              <Option value="UI Designer">UI Designer</Option>
              <Option value="Motion Graphics Designer">
                Motion Graphics Designer
              </Option>
              <Option value="Brand Manager">Brand Manager</Option>
              <Option value="Content Strategist">Content Strategist</Option>
              <Option value="Social Media Manager">Social Media Manager</Option>
              <Option value="Community Manager">Community Manager</Option>
              <Option value="Content Creator">Content Creator</Option>
              <Option value="E-commerce Manager">E-commerce Manager</Option>
              <Option value="Digital Marketing Specialist">
                Digital Marketing Specialist
              </Option>
              <Option value="UX Researcher">UX Researcher</Option>
              <Option value="SEO Specialist">SEO Specialist</Option>
              <Option value="Product Manager">Product Manager</Option>
              <Option value="Project Manager">Project Manager</Option>
              <Option value="Business Analyst">Business Analyst</Option>
              <Option value="Financial Analyst">Financial Analyst</Option>
              <Option value="IT Manager">IT Manager</Option>
              <Option value="IT Director">IT Director</Option>
              <Option value="Chief Technology Officer (CTO)">
                Chief Technology Officer (CTO)
              </Option>
              <Option value="Chief Information Officer (CIO)">
                Chief Information Officer (CIO)
              </Option>
              <Option value="Security Engineer">Security Engineer</Option>
              <Option value="Penetration Tester">Penetration Tester</Option>
              <Option value="Forensic Analyst">Forensic Analyst</Option>
              <Option value="Security Consultant">Security Consultant</Option>
              <Option value="Security Architect">Security Architect</Option>
              <Option value="Ethical Hacker">Ethical Hacker</Option>
              <Option value="Network Security Engineer">
                Network Security Engineer
              </Option>
              <Option value="Malware Analyst">Malware Analyst</Option>
              <Option value="Incident Responder">Incident Responder</Option>
              <Option value="Security Operations Center (SOC) Analyst">
                Security Operations Center (SOC) Analyst
              </Option>
              <Option value="Identity and Access Management (IAM) Specialist">
                Identity and Access Management (IAM) Specialist
              </Option>
              <Option value="Blockchain Developer">Blockchain Developer</Option>
              <Option value="Cryptocurrency Analyst">
                Cryptocurrency Analyst
              </Option>
              <Option value="Smart Contract Developer">
                Smart Contract Developer
              </Option>
              <Option value="AI Ethics Specialist">AI Ethics Specialist</Option>
              <Option value="Robotics Engineer">Robotics Engineer</Option>
              <Option value="Computer Vision Engineer">
                Computer Vision Engineer
              </Option>
              <Option value="Natural Language Processing (NLP) Engineer">
                Natural Language Processing (NLP) Engineer
              </Option>
              <Option value="Speech Recognition Engineer">
                Speech Recognition Engineer
              </Option>
              <Option value="Augmented Reality (AR) Developer">
                Augmented Reality (AR) Developer
              </Option>
              <Option value="Virtual Reality (VR) Developer">
                Virtual Reality (VR) Developer
              </Option>
              <Option value="Gaming Developer">Gaming Developer</Option>
              <Option value="Software Development Manager">
                Software Development Manager
              </Option>
              <Option value="Technical Project Manager">
                Technical Project Manager
              </Option>
              <Option value="UX/UI Manager">UX/UI Manager</Option>
              <Option value="IT Security Manager">IT Security Manager</Option>
              <Option value="Data Science Manager">Data Science Manager</Option>
              <Option value="AI/ML Researcher">AI/ML Researcher</Option>
              <Option value="AI/ML Product Manager">
                AI/ML Product Manager
              </Option>
              <Option value="Ethical AI/ML Consultant">
                Ethical AI/ML Consultant
              </Option>
              <Option value="Network Security Manager">
                Network Security Manager
              </Option>
              <Option value="Blockchain Consultant">
                Blockchain Consultant
              </Option>
              <Option value="VR/AR Development Manager">
                VR/AR Development Manager
              </Option>
              <Option value="Chief Information Security Officer (CISO)">
                Chief Information Security Officer (CISO)
              </Option>
              <Option value="Chief AI Officer (CAIO)">
                Chief AI Officer (CAIO)
              </Option>
              <Option value="Chief Data Officer (CDO)">
                Chief Data Officer (CDO)
              </Option>
              <Option value="Chief Analytics Officer (CAO)">
                Chief Analytics Officer (CAO)
              </Option>
              <Option value="Chief Privacy Officer (CPO)">
                Chief Privacy Officer (CPO)
              </Option>
              <Option value="Chief Robotics Officer (CRO)">
                Chief Robotics Officer (CRO)
              </Option>
              <Option value="Chief Blockchain Officer (CBO)">
                Chief Blockchain Officer (CBO)
              </Option>
              <Option value="Chief Virtual Reality Officer (CVRO)">
                Chief Virtual Reality Officer (CVRO)
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['roles', 0, 'experience']}
            noStyle
            rules={[{ required: true, message: 'Experience is required' }]}
          >
            <InputNumber style={{ width: '20%' }} placeholder="Experience" />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item
        label="Select up to 5 skills"
        name="skills"
        rules={[
          {
            required: true,
            message: 'Please select skills!',
          },
        ]}
      >
        <Select mode="multiple" placeholder="Select Skills" maxTagCount={5}>
          <Option value="Java">Java</Option>
          <Option value="Python">Python</Option>
          <Option value="JavaScript">JavaScript</Option>
          <Option value="C++">C++</Option>
          <Option value="Ruby">Ruby</Option>
          <Option value="PHP">PHP</Option>
          <Option value="C#">C#</Option>
          <Option value="HTML">HTML</Option>
          <Option value="CSS">CSS</Option>
          <Option value="React.js">React.js</Option>
          <Option value="Angular">Angular</Option>
          <Option value="Vue.js">Vue.js</Option>
          <Option value="Node.js">Node.js</Option>
          <Option value="Express.js">Express.js</Option>
          <Option value="SQL">SQL</Option>
          <Option value="MySQL">MySQL</Option>
          <Option value="PostgreSQL">PostgreSQL</Option>
          <Option value="SQLite">SQLite</Option>
          <Option value="MongoDB">MongoDB</Option>
          <Option value="AWS">AWS</Option>
          <Option value="Azure">Azure</Option>
          <Option value="GCP">GCP</Option>
          <Option value="Docker">Docker</Option>
          <Option value="Kubernetes">Kubernetes</Option>
          <Option value="Jenkins">Jenkins</Option>
          <Option value="Git">Git</Option>
          <Option value="Ethical Hacking">Ethical Hacking</Option>
          <Option value="Security Analysis">Security Analysis</Option>
          <Option value="Firewall Configuration">Firewall Configuration</Option>
          <Option value="TensorFlow">TensorFlow</Option>
          <Option value="PyTorch">PyTorch</Option>
          <Option value="NLP">Natural Language Processing</Option>
          <Option value="Cisco">Cisco</Option>
          <Option value="TCP/IP">TCP/IP</Option>
          <Option value="Routing/Switching">Routing/Switching</Option>
          <Option value="Verbal Communication">Verbal Communication</Option>
          <Option value="Written Communication">Written Communication</Option>
          <Option value="Active Listening">Active Listening</Option>
          <Option value="Critical Thinking">Critical Thinking</Option>
          <Option value="Analytical Skills">Analytical Skills</Option>
          <Option value="Collaboration">Collaboration</Option>
          <Option value="Conflict Resolution">Conflict Resolution</Option>
          <Option value="Embracing Change">Embracing Change</Option>
          <Option value="Learning Agility">Learning Agility</Option>
          <Option value="Prioritization">Prioritization</Option>
          <Option value="Meeting Deadlines">Meeting Deadlines</Option>
          <Option value="Decision Making">Decision Making</Option>
          <Option value="Delegation">Delegation</Option>
          <Option value="Adobe Photoshop">Adobe Photoshop</Option>
          <Option value="Illustrator">Illustrator</Option>
          <Option value="InDesign">InDesign</Option>
          <Option value="Sketch">Sketch</Option>
          <Option value="Figma">Figma</Option>
          <Option value="Adobe XD">Adobe XD</Option>
          <Option value="Premiere Pro">Premiere Pro</Option>
          <Option value="After Effects">After Effects</Option>
          <Option value="Agile/Scrum">Agile/Scrum</Option>
          <Option value="Microsoft Project">Microsoft Project</Option>
          <Option value="SEO/SEM">SEO/SEM</Option>
          <Option value="Social Media Marketing">Social Media Marketing</Option>
          <Option value="Excel">Excel</Option>
          <Option value="Financial Modeling">Financial Modeling</Option>
          <Option value="Relationship Building">Relationship Building</Option>
          <Option value="Negotiation Skills">Negotiation Skills</Option>
          <Option value="Empathy">Empathy</Option>
          <Option value="Legal Research">Legal Research</Option>
          <Option value="Contract Negotiation">Contract Negotiation</Option>
        </Select>
      </Form.Item>

      <Form.Item name="active" valuePropName="checked">
        <Checkbox>Active</Checkbox>
      </Form.Item>

      <Form.Item>
        <button type="submit" className={"bg-blue-500 text-white hover:bg-blue-700"} style={{width:"110%"}}>
            Publish your profile
        </button>
      </Form.Item>
    </Form>
  )
}

export default ProfileForm
