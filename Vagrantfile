# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # common settings shared by all vagrant boxes for this project
  config.vm.box = "ubuntu/trusty64"
  config.ssh.forward_agent = true
  config.vm.provision "shell", path: "./vagrant/provision.sh"
  config.vm.synced_folder "./", "/vagrant"
  # config.vm.synced_folder "./", "/vagrant", disabled: true
  # config.ssh.pty = true
  # NOTE(berendt): This solves the Ubuntu-specific Vagrant issue 1673.
  #                https://github.com/mitchellh/vagrant/issues/1673
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
  config.vm.define "wg" do |host|
    host.vm.network "private_network", :ip => "10.9.8.60", :name => "vboxnet0", :adapter => 2
    host.vm.hostname = "wg.carson.dev"
  end
end
