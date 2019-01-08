/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.view.sam.componentes.autocomplete;

import java.util.List;
import java.util.Map;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBancos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayCedulasTecnicas;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadMedidas;
import mx.gob.municipio.centro.model.gateways.sam.GatewayProyectoPartidas;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUsuarios;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;

public class AutocompleteDiversos  extends ControladorBase  {

	public AutocompleteDiversos() {	
		
	}	
	
	@Autowired
	private GatewayBeneficiario gatewayBeneficiario;
		
	
	@Autowired
	GatewayCedulasTecnicas gatewayCedulasTecnicas;
	
	
	@Autowired
	GatewayProyectoPartidas gatewayProyectoPartidas;
	
	
	@Autowired
	GatewayUnidadMedidas gatewayUnidadMedidas;
	
	
	@Autowired
	GatewayBancos gatewayBancos;
	
	
	@Autowired
	private GatewayUsuarios gatewayUsuarios;

	
	public List<Map<String, Object>> getBeneficiariosTodos(Integer tipo){		
		return (List<Map<String, Object>>) gatewayBeneficiario.getBeneficiariosTodos(tipo);
	}
 

	public List<Map<String, Object>> getPartidasPorProyecto(String proyecto){		
		return gatewayProyectoPartidas.getPartidasPorProyectos(proyecto);
	}
	
	
	public List<Map<String, Object>> getProyectosPorUnidad(String claveUnidad){		
		return gatewayCedulasTecnicas.getProyectosPorUnidad(claveUnidad);
	}
	
	public List<Map<String, Object>> getProyectosTodos(){		
		return gatewayCedulasTecnicas.getProyectosTodos();
	}
	
	public List<Map<String, Object>> getUnidadMedidasTodas(){
		return gatewayUnidadMedidas.getUnidadMedidasTodas();
	}
	
	public List<Map<String, Object>> getBancosTodos(){
		return gatewayBancos.getBancosTodos();
	}
	
	public List<Map<String,Object>> getPersonas(){
		return gatewayUsuarios.getPersonasPorEjemplo("", "", "");
	}
	
	public List<Map<String, Object>> getProyectosEval(){
		return this.gatewayProyectoPartidas.getTodosProyectos();
	}
	
}
